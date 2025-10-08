import { PGliteWorker } from '@electric-sql/pglite/worker';
import OpfsWorker from './opfs-worker.js?worker';

class TodoOpfs {
	#items = $state([]);
	#loading = $state(true);
	#error = $state(null);
	#pg = null;
	#supported = $state(true);

	constructor() {
		if (typeof window !== 'undefined') {
			this.#checkSupport();
			if (this.#supported) {
				this.#init();
			} else {
				this.#loading = false;
			}
		}
	}

	get items() {
		return this.#items;
	}

	get loading() {
		return this.#loading;
	}

	get error() {
		return this.#error;
	}

	get supported() {
		return this.#supported;
	}

	#checkSupport() {
		// Safari 브라우저 감지 (OPFS Access Handle을 지원하지 않음)
		const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		if (isSafari) {
			this.#supported = false;
			this.#error = 'Safari는 현재 OPFS Access Handle Pool을 지원하지 않습니다.';
			return;
		}

		// OPFS Access Handle Pool 지원 확인
		try {
			if (
				!('storage' in navigator) ||
				!('getDirectory' in navigator.storage)
			) {
				this.#supported = false;
				this.#error = 'OPFS가 지원되지 않는 브라우저입니다. Chrome, Edge 등의 브라우저를 사용해주세요.';
				return;
			}

			this.#supported = true;
		} catch (e) {
			this.#supported = false;
			this.#error = 'OPFS 지원 확인 중 오류가 발생했습니다.';
		}
	}

	async #init() {
		if (this.#pg) return;

		try {
			this.#pg = new PGliteWorker(new OpfsWorker({ type: 'module' }));
			await this.#pg.waitReady;
			await this.#loadData();
			this.#loading = false;
		} catch (e) {
			// OPFS가 실제로 지원되지 않는 경우 (Safari 등)
			this.#supported = false;
			this.#error = e instanceof Error 
				? e.message 
				: 'OPFS 초기화 중 오류가 발생했습니다. 브라우저가 OPFS를 완전히 지원하지 않을 수 있습니다.';
			this.#loading = false;
		}
	}

	async #loadData() {
		if (!this.#pg) return;

		const result = await this.#pg.query(`
			SELECT id, title, summary, completed, completed_at, created_at, updated_at
			FROM todo
			ORDER BY id DESC
		`);

		this.#items = result.rows;
	}

	async refresh() {
		if (!this.#pg) return;

		await this.#pg.exec(`
			INSERT INTO todo (title, summary, completed)
			VALUES ('1일 5커밋 하기', '조금 부담스럽나요?', false)
		`);

		await this.#loadData();
	}

	async toggleComplete(id) {
		if (!this.#pg) return;

		// 트리거가 자동으로 completed_at과 updated_at을 관리합니다
		await this.#pg.query(`
			UPDATE todo 
			SET completed = NOT completed
			WHERE id = $1
		`, [id]);

		await this.#loadData();
	}

	async clearAll() {
		if (!this.#pg) return;

		await this.#pg.exec(`DELETE FROM todo`);
		await this.#loadData();
	}
}

export const todoOpfs = new TodoOpfs();

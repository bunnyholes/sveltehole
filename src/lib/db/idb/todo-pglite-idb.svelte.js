import { ready } from '$lib/db/idb/pglite.client.js';

class Todo {
    #items = $state([]);
    #loading = $state(true);
    #error = $state(null);

    constructor() {
        if (typeof window !== 'undefined') {
            this.#init();
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

    async #init() {
        try {
            await this.load();
            this.#loading = false;
        } catch (e) {
            this.#error = e.message;
            this.#loading = false;
        }
    }

    async load() {
        const db = await ready;
        if (!db) {
            throw new Error('PGLite is only available in the browser.');
        }

        const result = await db.query(`
            SELECT id, title, summary, completed, completed_at, created_at, updated_at
            FROM todo
            ORDER BY id DESC
        `);

        this.#items = result.rows;
    }

    async addItem() {
        const db = await ready;
        if (!db) {
            throw new Error('PGLite is only available in the browser.');
        }

        await db.exec(`
            INSERT INTO todo (title, summary, completed)
            VALUES ('1일 5커밋 하기', '조금 부담스럽나요?', false)
        `);

        await this.load();
    }

    async toggleComplete(id) {
        const db = await ready;
        if (!db) {
            throw new Error('PGLite is only available in the browser.');
        }

        // 트리거가 자동으로 completed_at과 updated_at을 관리합니다
        await db.query(`
            UPDATE todo 
            SET completed = NOT completed
            WHERE id = $1
        `, [id]);

        await this.load();
    }

    async clearAll() {
        const db = await ready;
        if (!db) {
            throw new Error('PGLite is only available in the browser.');
        }

        await db.exec(`DELETE FROM todo`);
        await this.load();
    }
}

export const todo = new Todo();

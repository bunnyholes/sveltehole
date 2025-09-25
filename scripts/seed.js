import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { guestbook } from '../src/lib/server/db/schema.js';

console.log('🌱 DB 시딩 시작...');

// SQLite 클라이언트 생성
const sqlite = new Database('local.db');
const db = drizzle(sqlite, { schema: { guestbook } });

// 테이블 재생성 (데모용: 기존 데이터 보존 X)
sqlite.exec(`
  DROP TABLE IF EXISTS guestbook;
  CREATE TABLE guestbook (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

// 시드 데이터
const seedData = [
	{
		id: '00000000-0000-4000-8000-guestbook001',
		name: '김철수',
		message: '멋진 사이트네요! SvelteKit Remote Functions 정말 편리해요 👍',
		createdAt: new Date(Date.now() - 60 * 60 * 1000) // 1시간 전
	},
	{
		id: '00000000-0000-4000-8000-guestbook002',
		name: '이영희', 
		message: '방명록 기능이 잘 작동하네요~ 모바일에서도 깔끔하게 보여요!',
		createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30분 전
	},
	{
		id: '00000000-0000-4000-8000-guestbook003',
		name: '박민수',
		message: '드리즐 ORM과 SQLite 조합이 정말 좋은 것 같아요. 개발 경험이 훌륭합니다! ✨',
		createdAt: new Date(Date.now() - 15 * 60 * 1000) // 15분 전
	},
	{
		id: '00000000-0000-4000-8000-guestbook004',
		name: '정지원',
		message: '실시간으로 업데이트되는 것도 신기하고, form 검증도 깔끔하게 되네요 🚀',
		createdAt: new Date(Date.now() - 5 * 60 * 1000) // 5분 전
	}
];

// 시드 데이터 삽입
try {
	await db.insert(guestbook).values(seedData);
	console.log('✅ 시드 데이터 삽입 완료!');
	console.log(`📊 총 ${seedData.length}개 항목 추가됨`);
} catch (error) {
	console.error('❌ 시드 데이터 삽입 실패:', error);
} finally {
	sqlite.close();
}

console.log('🌱 DB 시딩 완료!');

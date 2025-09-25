-- 방명록 테이블 생성
DROP TABLE IF EXISTS guestbook;

CREATE TABLE guestbook (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at INTEGER NOT NULL
);

-- 인덱스 생성 (생성일자 기준 정렬용)
CREATE INDEX idx_guestbook_created_at ON guestbook(created_at DESC);
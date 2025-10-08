const CREATE_TODO_TABLE_SQL = `
    CREATE TABLE IF NOT EXISTS todo (
        id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title text NOT NULL,
        summary text,
        completed boolean DEFAULT false,
        completed_at timestamptz,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz
    );
`;

// 트리거 함수: updated_at을 자동으로 설정
const CREATE_UPDATE_TIMESTAMP_FUNCTION = `
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
`;

// 트리거 함수: completed 상태 변경 시 completed_at 자동 관리
const CREATE_COMPLETED_TIMESTAMP_FUNCTION = `
    CREATE OR REPLACE FUNCTION manage_completed_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.completed = true AND OLD.completed = false THEN
            NEW.completed_at = now();
        ELSIF NEW.completed = false AND OLD.completed = true THEN
            NEW.completed_at = NULL;
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
`;

// updated_at 트리거 생성
const CREATE_UPDATE_TRIGGER_SQL = `
    DROP TRIGGER IF EXISTS set_updated_at ON todo;
    CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON todo
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
`;

// completed_at 트리거 생성
const CREATE_COMPLETED_TRIGGER_SQL = `
    DROP TRIGGER IF EXISTS set_completed_at ON todo;
    CREATE TRIGGER set_completed_at
    BEFORE UPDATE ON todo
    FOR EACH ROW
    EXECUTE FUNCTION manage_completed_at_column();
`;

// 기존 테이블에 새 컬럼 추가 (마이그레이션)
const MIGRATE_ADD_COMPLETED_COLUMNS = `
    DO $$ 
    BEGIN
        -- completed 컬럼이 없으면 추가
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'todo' AND column_name = 'completed'
        ) THEN
            ALTER TABLE todo ADD COLUMN completed boolean DEFAULT false;
        END IF;

        -- completed_at 컬럼이 없으면 추가
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'todo' AND column_name = 'completed_at'
        ) THEN
            ALTER TABLE todo ADD COLUMN completed_at timestamptz;
        END IF;

        -- updated_at 컬럼이 없으면 추가
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'todo' AND column_name = 'updated_at'
        ) THEN
            ALTER TABLE todo ADD COLUMN updated_at timestamptz;
        END IF;
    END $$;
`;

const INSERT_SEED_TODO_SQL = `
    INSERT INTO todo (title, summary, completed)
    SELECT '1일 1코딩 하기', '열심히 하셨나요?', false
    WHERE NOT EXISTS (SELECT 1 FROM todo);
`;

/**
 * @param {import('@electric-sql/pglite').PGlite} db
 */
export async function bootstrapPglite(db) {
    // 1. 테이블 생성 (없으면)
    await db.exec(CREATE_TODO_TABLE_SQL);
    
    // 2. 마이그레이션: 기존 테이블에 컬럼 추가
    await db.exec(MIGRATE_ADD_COMPLETED_COLUMNS);
    
    // 3. 트리거 함수 생성
    await db.exec(CREATE_UPDATE_TIMESTAMP_FUNCTION);
    await db.exec(CREATE_COMPLETED_TIMESTAMP_FUNCTION);
    
    // 4. 트리거 생성
    await db.exec(CREATE_UPDATE_TRIGGER_SQL);
    await db.exec(CREATE_COMPLETED_TRIGGER_SQL);
    
    // 5. 시드 데이터 추가
    await db.exec(INSERT_SEED_TODO_SQL);
}

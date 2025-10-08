# sveltehole

SvelteKit 5 데모 저장소

## 설치 및 실행

```bash
pnpm i
pnpm dev
```

## Cloudflare D1 데이터베이스

이 프로젝트는 Cloudflare D1 데이터베이스를 사용합니다.

## 브라우저 PGLite 샘플

브라우저에서 구동되는 PostgreSQL 호환 데이터베이스인 PGLite를 사용한 예제를 `/db/pglite` 라우트에서 확인할 수 있습니다. 페이지가 로드되면 `todo` 테이블이 자동으로 생성되고 현재 데이터가 목록으로 렌더링됩니다. 필요한 경우 `src/lib/db/pglite.bootstrap.js` 에 해당 스키마를 수정하세요.

Vite 개발 서버에서 WebAssembly 번들을 정상적으로 제공하려면 `vite.config.js` 에 `optimizeDeps.exclude` 와 `assetsInclude` 설정이 추가되어 있습니다. PGLite 공식 문서에서도 Vite와 같은 번들러에서는 사전 최적화에서 `@electric-sql/pglite`를 제외하도록 권장합니다. citeturn1search0

### 로컬 개발 환경 설정

```bash
# 로컬 D1 데이터베이스 초기화 (스키마 + 시드 데이터)
./scripts/init-local-d1.sh

# 또는 수동으로 실행
wrangler d1 execute sveltehole-db --file=migrations/0001_create_guestbook.sql --local
wrangler d1 execute sveltehole-db --file=migrations/0002_seed_guestbook.sql --local
```

### 프로덕션 배포

```bash
# 전체 배포 프로세스 (빌드 + D1 초기화 + 배포)
./scripts/deploy-d1.sh

# 또는 수동으로 실행
npm run build
wrangler d1 execute sveltehole-db --file=migrations/0001_create_guestbook.sql --remote
wrangler d1 execute sveltehole-db --file=migrations/0002_seed_guestbook.sql --remote
wrangler pages deploy
```

### D1 데이터베이스 관리

```bash
# D1 데이터베이스 목록 확인
wrangler d1 list

# 로컬 D1 쿼리 실행
wrangler d1 execute sveltehole-db --command="SELECT * FROM guestbook" --local

# 원격 D1 쿼리 실행
wrangler d1 execute sveltehole-db --command="SELECT * FROM guestbook" --remote
```

### 마이그레이션 파일

- `migrations/0001_create_guestbook.sql` - 방명록 테이블 스키마
- `migrations/0002_seed_guestbook.sql` - 초기 시드 데이터

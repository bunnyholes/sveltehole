# Contributing to Sveltehole

이 문서는 Sveltehole 프로젝트의 코드 품질 표준과 기여 가이드를 설명합니다.

## 코드 품질 표준

### 1. 코드 포맷팅 (Prettier)

프로젝트는 Prettier를 사용하여 일관된 코드 스타일을 유지합니다.

```bash
# 코드 포맷팅 확인
npm run lint

# 자동 포맷팅
npm run format
```

### 2. 타입 체크 (TypeScript/JSDoc)

프로젝트는 JavaScript 파일에서 JSDoc을 사용하여 타입 안정성을 제공합니다.

```bash
# 타입 체크 실행
npm run check
```

#### 타입 정의 가이드라인

- **함수 파라미터**: 모든 함수 파라미터에 JSDoc 타입 주석 추가
- **any 타입**: 필요한 경우에만 사용하며, 주석으로 이유 설명
- **Locals 인터페이스**: `src/app.d.ts`에 전역 타입 정의

예시:

```javascript
/**
 * @param {typeof fetch} fetch
 */
export const fetchWeather = async (fetch) => {
	// ...
};
```

### 3. ESLint 규칙

프로젝트는 ESLint를 사용하여 코드 품질을 검사합니다.

#### 현재 적용된 규칙

- **no-unused-vars**: 사용하지 않는 변수 금지
- **svelte/no-useless-mustaches**: 불필요한 Mustache 문법 금지
- **svelte/require-each-key**: Each 블록에 key 속성 권장
- **svelte/no-navigation-without-resolve**: 네비게이션 링크에 resolve 사용 권장

#### 알려진 제한사항

다음 이슈는 현재 프레임워크/라이브러리 제약으로 인해 남아있습니다:

1. **Paraglide 임포트 오류**: `$lib/paraglide` 파일은 빌드 시 자동 생성되므로 타입 체크에서 오류가 발생할 수 있습니다.
2. **Svelte 5 Snippet 타입**: Snippet 파라미터는 아직 TypeScript 타입 주석을 지원하지 않습니다.
3. **Remote Functions 타입**: SvelteKit Remote Functions의 동적 속성(`result`, `pending` 등)은 타입 정의가 완전하지 않을 수 있습니다.
4. **TypeScript Svelte 컴포넌트**: `<script lang="ts">`를 사용하는 컴포넌트에서 ESLint 파싱 오류가 발생할 수 있습니다. 이는 정상적인 동작입니다.

#### ESLint 규칙 예외

다음 규칙들은 권장사항이며, 프로젝트의 특성상 일부 위반이 허용됩니다:

- **svelte/require-each-key**: 정적 리스트에서는 key가 필수가 아닐 수 있습니다.
- **svelte/no-navigation-without-resolve**: 일부 페이지에서는 의도적으로 단순 링크를 사용할 수 있습니다.

### 4. 빌드 및 테스트

```bash
# 프로젝트 빌드
npm run build

# 유닛 테스트
npm run test:unit

# E2E 테스트
npm run test:e2e

# 전체 테스트
npm test
```

## 개발 워크플로우

1. 코드 작성
2. `npm run format` - 코드 포맷팅
3. `npm run check` - 타입 체크
4. `npm run lint` - ESLint 검사
5. `npm run build` - 빌드 확인
6. `npm test` - 테스트 실행
7. 커밋 및 PR 생성

## 커밋 메시지 규칙

명확하고 설명적인 커밋 메시지를 작성합니다:

- `feat: 새로운 기능 추가`
- `fix: 버그 수정`
- `docs: 문서 업데이트`
- `style: 코드 포맷팅, 세미콜론 등`
- `refactor: 코드 리팩토링`
- `test: 테스트 추가 또는 수정`
- `chore: 빌드 프로세스, 도구 설정 등`

## 코드 품질 개선 이력

### 2024년 수정 사항

- ✅ Prettier 포맷팅: 22개 파일 자동 포맷팅 완료
- ✅ TypeScript/JSDoc 타입 오류: 19개 수정
  - `app.d.ts`에 Locals 인터페이스 추가
  - 함수 파라미터 타입 주석 추가
  - JSDoc 파라미터 불일치 수정
- ✅ ESLint 자동 수정: 1개 오류 자동 수정
- ✅ package-lock.json을 .gitignore에 추가 (프로젝트는 pnpm 사용)

### 남은 개선 사항

다음 항목들은 기능적으로 문제가 없으나, 코드 품질을 더 향상시킬 수 있습니다:

- **Each 블록에 key 추가**: 리스트 렌더링 성능 최적화 (7개)
- **네비게이션 resolve**: SvelteKit 네비게이션 링크 최적화 (6개)
- **사용하지 않는 변수**: 일부 변수 제거 가능 (1개)

## 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해주세요.

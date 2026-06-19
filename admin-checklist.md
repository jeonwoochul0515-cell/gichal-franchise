# 관리자(Admin) 페이지 구축 체크리스트

## 목표
폼 + AI 챗 형식의 관리자 페이지로 메뉴·가격·매장·인스타·FAQ·본문·이미지를 비개발자가 직접 유지보수.

## 0. 인프라
- [ ] Cloudflare KV 네임스페이스 생성 + Pages 바인딩(CONTENT)
- [ ] 시크릿 설정: ADMIN_PASSWORD, AUTH_SECRET, ANTHROPIC_API_KEY
- [ ] wrangler.toml 작성(바인딩)

## 1. 콘텐츠 모델/기본값
- [ ] 편집 가능한 콘텐츠 스키마 정의(brand/menus/stores/instagram/faqs/texts)
- [ ] 기존 data 파일을 기본값(default content)으로 추출

## 2. Functions(API)
- [ ] GET /api/content — 공개, 현재 콘텐츠 JSON
- [ ] POST /api/admin/login — 비밀번호 → 서명 쿠키
- [ ] GET/PUT /api/admin/content — 보호, 콘텐츠 읽기/저장
- [ ] POST /api/admin/upload — 보호, 이미지 KV 저장 → URL
- [ ] GET /api/img/:id — 공개, 이미지 서빙
- [ ] POST /api/admin/chat — 보호, Anthropic 호출 → 콘텐츠 변경 적용

## 3. 공개 사이트 동적화
- [ ] ContentProvider: /api/content fetch + 기본값 폴백
- [ ] 컴포넌트(메뉴·매장·인스타·FAQ·인사말 등) 컨텍스트에서 읽도록 전환

## 4. 관리자 UI(/admin)
- [ ] 로그인 화면
- [ ] 섹션별 폼: 메뉴/가격, 매장(추가·지도클릭 좌표), 인스타 URL, FAQ, 본문 텍스트
- [ ] 이미지 업로드 위젯
- [ ] AI 챗 패널(자연어 → 변경 미리보기 → 적용)

## 5. 마감
- [ ] 빌드/배포
- [ ] 로그인·수정·반영 동작 검증
- [ ] 비밀번호/키 안내

## 대기(사용자 입력)
- [ ] Anthropic API 키
- [ ] 관리자 비밀번호

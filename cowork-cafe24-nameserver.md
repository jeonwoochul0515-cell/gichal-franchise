# Cowork 프롬프트 — 카페24에서 gichal.com 네임서버를 Cloudflare로 변경

아래 블록 전체를 cowork 세션에 붙여넣어 사용하세요. (카페24 로그인은 사용자가 직접)

---

## 작업
카페24(Cafe24)에 등록된 도메인 **gichal.com** 의 네임서버를 **Cloudflare 네임서버 2개로 교체**해줘.
이 도메인을 Cloudflare로 옮겨서 Cloudflare Pages로 만든 홈페이지에 연결하는 중이야.

## 입력값 (확정)
- 카페24 도메인: **gichal.com** (카페24 아이디: `cs92`)
- **새로 넣을 Cloudflare 네임서버 (정확히 이 2개만):**
  - `addilyn.ns.cloudflare.com`
  - `sean.ns.cloudflare.com`
- **지워야 할 기존 카페24 네임서버:**
  - `ns1.cafe24.com`, `ns2.cafe24.com`, `ns1.cafe24.co.kr`, `ns2.cafe24.co.kr`

## 절차 (카페24 호스팅 관리 패널)
1. 카페24 호스팅(hosting.cafe24.com) 로그인 → **나의서비스관리 / 호스팅관리**
2. 좌측 **도메인관리** → **도메인 네임서버(DNS) 관리**
3. 목록에서 **gichal.com** 선택 → **네임서버 변경**
4. 입력란의 기존 카페24 네임서버를 모두 지우고, 1차/2차 네임서버에 아래를 입력
   - 1차: `addilyn.ns.cloudflare.com`
   - 2차: `sean.ns.cloudflare.com`
   - (입력칸이 3·4차까지 있으면 비워두거나, 필수면 1·2차 값을 반복 입력)
5. **저장/변경 확정**
6. 변경 후 화면의 "현재 네임서버"가 cloudflare.com 으로 바뀌었는지 확인

## 주의
- DNS 레코드(A/CNAME/MX/TXT)는 카페24에서 건드리지 말 것. 웹/이메일 레코드 정리는 Cloudflare 쪽에서 이미 처리 중.
- 네임서버 변경은 적용까지 보통 수십 분~수 시간 걸릴 수 있음(전파 대기). 즉시 안 바뀌어도 정상.
- 카페24 계정 로그인·보안문자 등은 자동화 불가하므로 사용자가 직접 입력. 에이전트는 입력값과 클릭 경로만 정확히 안내.

## 완료 기준
- [ ] gichal.com의 네임서버가 `addilyn.ns.cloudflare.com`, `sean.ns.cloudflare.com` 으로 변경·저장됨
- [ ] 변경 완료 후, 메인 작업자에게 "네임서버 변경 완료"라고 알림
  (그 다음 Cloudflare 활성화 확인 + Pages 커스텀 도메인 연결은 메인 세션에서 처리)

## 검증(터미널, 전파 후)
```
nslookup -type=ns gichal.com 8.8.8.8
```
응답에 `addilyn.ns.cloudflare.com`, `sean.ns.cloudflare.com` 가 보이면 성공.

# Cowork 프롬프트 — 네이버 / 구글 검색 등록 (서치어드바이저 + 서치콘솔)

아래 블록을 cowork 세션에 붙여넣어 사용하세요. 계정 로그인은 사용자가 직접.

---

## 작업 목표
홈페이지 **https://gichal.com** 을 **네이버 서치어드바이저**와 **구글 서치콘솔**에 등록하고,
소유 확인 + 사이트맵 제출까지 완료해줘.

## 사이트 정보 (확정)
- 사이트 주소: **https://gichal.com** (Cloudflare Pages 배포, 운영 중)
- 사이트맵: **https://gichal.com/sitemap.xml** (이미 배포됨, 접속 시 200)
- robots.txt: https://gichal.com/robots.txt (검색·AI 크롤러 허용 설정 완료)
- 사이트 성격: 기찰반점(중식 무한리필 뷔페) 가맹본부 — 가맹점 모집 홈페이지

## 중요 — 소유확인 방식은 "HTML 메타태그"로 통일
사이트는 React 정적 빌드라 파일 업로드보다 **메타태그 방식**이 깔끔함.
각 도구에서 발급되는 **메타태그(또는 인증코드)는 사이트 코드(index.html)에 넣어야 하므로,
발급된 메타태그 2개를 메인 작업 세션(사이트 담당)에 전달**해서 삽입·배포한 뒤 "확인" 버튼을 눌러야 함.

### A. 구글 서치콘솔 (Google Search Console)
1. https://search.google.com/search-console 접속 → 로그인
2. 속성 추가 → **URL 접두어** 선택 → `https://gichal.com` 입력
3. 소유권 확인 방법 중 **HTML 태그** 선택 → 표시되는 `<meta name="google-site-verification" content="..." />` **복사**
4. 이 메타태그를 **메인 세션에 전달** → 사이트에 삽입·배포 완료되면 → "확인" 클릭
5. 확인 완료 후: 좌측 **Sitemaps** → `sitemap.xml` 입력 → 제출
   - (대안 소유확인: 도메인이 Cloudflare에 있으므로 "도메인" 속성 + DNS TXT 방식도 가능. 단 Cloudflare에 TXT 추가가 필요하니, 간단한 건 메타태그 방식)

### B. 네이버 서치어드바이저 (Naver Search Advisor)
1. https://searchadvisor.naver.com 접속 → 네이버 로그인
2. **웹마스터 도구** → 사이트 등록에 `https://gichal.com` 입력
3. 사이트 소유확인 → **HTML 태그** 방식 선택 → `<meta name="naver-site-verification" content="..." />` **복사**
4. 이 메타태그를 **메인 세션에 전달** → 삽입·배포 후 → "소유확인" 클릭
5. 확인 후: **요청 → 사이트맵 제출** → `https://gichal.com/sitemap.xml` 제출
6. (추가) **요청 → 웹페이지 수집**에 `https://gichal.com/` 한 번 요청해두면 색인 빨라짐

## 메인 세션에 넘길 것 (정확히 이 2개)
- 구글: `<meta name="google-site-verification" content="XXXXXXXX" />`
- 네이버: `<meta name="naver-site-verification" content="YYYYYYYY" />`
→ 메인 세션이 index.html `<head>`에 삽입하고 재배포함. 그 후 각 도구에서 "확인" 버튼 클릭.

## 완료 기준
- [ ] 구글 서치콘솔 소유확인 완료 + sitemap.xml 제출됨
- [ ] 네이버 서치어드바이저 소유확인 완료 + sitemap.xml 제출됨

## 참고 (이미 사이트에 적용된 것 — 다시 안 해도 됨)
- title/description/canonical/OG/Twitter 메타, JSON-LD(Organization·FoodEstablishment·매장5곳 Restaurant·FAQPage),
  robots.txt(AI 크롤러 포함), sitemap.xml 모두 적용 완료.
- 따라서 cowork는 "검색엔진에 등록 + 소유확인 + 사이트맵 제출"만 하면 됨.

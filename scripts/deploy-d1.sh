#!/bin/bash

# D1 배포 스크립트
# Cloudflare D1 데이터베이스 초기화 및 시드 데이터 주입

echo "🚀 Cloudflare D1 배포 시작..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# D1 데이터베이스 이름
DB_NAME="sveltehole-db"

# 1. 프로덕션 빌드
echo -e "${YELLOW}📦 프로덕션 빌드 시작...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 빌드 실패${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 빌드 완료${NC}"

# 2. 스키마 초기화 (원격)
echo -e "${YELLOW}🗄️  D1 데이터베이스 스키마 초기화 (원격)...${NC}"
wrangler d1 execute $DB_NAME --file=migrations/0001_create_guestbook.sql --remote
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 스키마 초기화 실패${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 스키마 초기화 완료${NC}"

# 3. 시드 데이터 주입 (원격)
echo -e "${YELLOW}🌱 시드 데이터 주입 (원격)...${NC}"
wrangler d1 execute $DB_NAME --file=migrations/0002_seed_guestbook.sql --remote
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  시드 데이터 주입 실패 (이미 존재할 수 있음)${NC}"
    # 시드 데이터 실패는 무시 (이미 데이터가 있을 수 있음)
fi
echo -e "${GREEN}✅ 시드 데이터 주입 시도 완료${NC}"

# 4. Cloudflare Pages 배포
echo -e "${YELLOW}🚀 Cloudflare Pages 배포 시작...${NC}"
wrangler pages deploy
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 배포 실패${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 배포 완료!${NC}"
echo -e "${GREEN}📌 URL: https://sveltehole.xiyo.dev${NC}"
#!/bin/bash

# 로컬 D1 데이터베이스 초기화 스크립트

echo "🔧 로컬 D1 데이터베이스 초기화..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# D1 데이터베이스 이름
DB_NAME="sveltehole-db"

# 1. 로컬 D1 데이터베이스 스키마 초기화
echo -e "${YELLOW}🗄️  로컬 D1 데이터베이스 스키마 초기화...${NC}"
wrangler d1 execute $DB_NAME --file=migrations/0001_create_guestbook.sql --local
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 로컬 스키마 초기화 실패${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 로컬 스키마 초기화 완료${NC}"

# 2. 로컬 시드 데이터 주입
echo -e "${YELLOW}🌱 로컬 시드 데이터 주입...${NC}"
wrangler d1 execute $DB_NAME --file=migrations/0002_seed_guestbook.sql --local
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  시드 데이터 주입 실패 (이미 존재할 수 있음)${NC}"
fi
echo -e "${GREEN}✅ 로컬 시드 데이터 주입 완료${NC}"

echo -e "${GREEN}🎉 로컬 D1 데이터베이스 초기화 완료!${NC}"
echo -e "${YELLOW}💡 로컬 개발 서버 실행: npm run dev${NC}"
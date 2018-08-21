--------------------------------------------------------
--  File created - Wednesday-August-08-2018   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table CART_PRODUCT
--------------------------------------------------------

  CREATE TABLE "NIKHIL"."CART_PRODUCT" 
   (	"CART_ID" NUMBER(10,0), 
	"PRODUCT_ID" NUMBER(10,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into NIKHIL.CART_PRODUCT
SET DEFINE OFF;
--------------------------------------------------------
--  Constraints for Table CART_PRODUCT
--------------------------------------------------------

  ALTER TABLE "NIKHIL"."CART_PRODUCT" MODIFY ("PRODUCT_ID" NOT NULL ENABLE);
  ALTER TABLE "NIKHIL"."CART_PRODUCT" MODIFY ("CART_ID" NOT NULL ENABLE);

--------------------------------------------------------
--  File created - Wednesday-August-08-2018   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table ORDERS
--------------------------------------------------------

  CREATE TABLE "NIKHIL"."ORDERS" 
   (	"ID" NUMBER(10,0), 
	"CREATED_DATE" TIMESTAMP (6), 
	"LASTUPDATE_DATE" TIMESTAMP (6), 
	"ORDERSTATUS" VARCHAR2(255 CHAR), 
	"ADDRESS_ID" NUMBER(10,0), 
	"USER_ID" NUMBER(10,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into NIKHIL.ORDERS
SET DEFINE OFF;
--------------------------------------------------------
--  DDL for Index SYS_C0011825
--------------------------------------------------------

  CREATE UNIQUE INDEX "NIKHIL"."SYS_C0011825" ON "NIKHIL"."ORDERS" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table ORDERS
--------------------------------------------------------

  ALTER TABLE "NIKHIL"."ORDERS" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "NIKHIL"."ORDERS" MODIFY ("USER_ID" NOT NULL ENABLE);
  ALTER TABLE "NIKHIL"."ORDERS" MODIFY ("ADDRESS_ID" NOT NULL ENABLE);
  ALTER TABLE "NIKHIL"."ORDERS" MODIFY ("ORDERSTATUS" NOT NULL ENABLE);
  ALTER TABLE "NIKHIL"."ORDERS" MODIFY ("ID" NOT NULL ENABLE);

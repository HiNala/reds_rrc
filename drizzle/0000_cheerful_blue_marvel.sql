CREATE TABLE "analytics_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"event" varchar(120) NOT NULL,
	"path" varchar(300),
	"session_id" varchar(100),
	"referrer" varchar(500),
	"utm" jsonb,
	"props" jsonb,
	"device" varchar(20),
	"locale" varchar(20),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"source" varchar(40) DEFAULT 'contact' NOT NULL,
	"name" varchar(200),
	"email" varchar(320) NOT NULL,
	"phone" varchar(40),
	"service" varchar(120),
	"message" text,
	"source_page" varchar(300),
	"utm" jsonb,
	"status" varchar(30) DEFAULT 'new' NOT NULL,
	"email_status" varchar(30) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" varchar(200),
	"source_page" varchar(300),
	"confirmed" boolean DEFAULT false NOT NULL,
	"confirm_token" varchar(100),
	"confirmed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);

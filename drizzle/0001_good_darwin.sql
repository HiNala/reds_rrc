CREATE TABLE "project_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"storage_key" varchar(500) NOT NULL,
	"alt" varchar(300),
	"content_type" varchar(100),
	"size" integer,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"category" varchar(100),
	"location" varchar(200),
	"published" boolean DEFAULT true NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
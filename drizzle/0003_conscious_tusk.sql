ALTER TABLE "projects" ADD COLUMN "slug" varchar(220) NOT NULL;--> statement-breakpoint
CREATE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "projects_published_featured_idx" ON "projects" USING btree ("published","featured");--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_slug_unique" UNIQUE("slug");
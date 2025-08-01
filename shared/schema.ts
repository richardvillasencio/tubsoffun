import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const layoutBlocks = pgTable("layout_blocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // hero, about, services, testimonials, gallery, etc.
  content: json("content").notNull(), // flexible JSON content
  order: integer("order").notNull(),
  isVisible: boolean("is_visible").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  date: text("date").notNull(),
  isVisible: boolean("is_visible").default(true),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  alt: text("alt").notNull(),
  category: text("category").default("general"),
  isVisible: boolean("is_visible").default(true),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const uploadedFiles = pgTable("uploaded_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull(),
  url: text("url").notNull(),
  uploadedBy: varchar("uploaded_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const headerConfig = pgTable("header_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  logoUrl: text("logo_url"),
  logoAlt: text("logo_alt").default("Logo"),
  emblemUrl: text("emblem_url"),
  emblemAlt: text("emblem_alt").default("Company Emblem"),
  mascotUrl: text("mascot_url"),
  mascotAlt: text("mascot_alt").default("Company Mascot"),
  navigationItems: json("navigation_items").notNull().default([]),
  contactPhone: text("contact_phone"),
  contactText: text("contact_text"),
  ctaText: text("cta_text"),
  ctaLink: text("cta_link"),
  // Top header fields
  topBarEnabled: boolean("top_bar_enabled").default(true),
  topBarPhone: text("top_bar_phone").default("(701) 234-0705"),
  topBarAddress: text("top_bar_address").default("601 Main Ave W, West Fargo, ND 58078"),
  topBarBackgroundType: text("top_bar_background_type").default("solid"), // solid, gradient, image
  topBarBackgroundColor: text("top_bar_background_color").default("#2dd4bf"),
  topBarBackgroundImage: text("top_bar_background_image"),
  topBarGradientFrom: text("top_bar_gradient_from"),
  topBarGradientTo: text("top_bar_gradient_to"),
  topBarTextColor: text("top_bar_text_color").default("#ffffff"),
  topBarLinks: json("top_bar_links").default([]),
  // Main navigation fields
  mainNavBackgroundColor: text("main_nav_background_color").default("#f97316"),
  mainNavTextColor: text("main_nav_text_color").default("#ffffff"),
  backgroundColor: text("background_color").default("#ffffff"),
  backgroundType: text("background_type").default("solid"), // solid, gradient, image
  backgroundImage: text("background_image"),
  gradientFrom: text("gradient_from"),
  gradientTo: text("gradient_to"),
  textColor: text("text_color").default("#000000"),
  linkColor: text("link_color").default("#2563eb"),
  linkHoverColor: text("link_hover_color").default("#1d4ed8"),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  role: true,
});

export const insertPageSchema = createInsertSchema(pages).pick({
  slug: true,
  title: true,
  metaDescription: true,
  isPublished: true,
});

export const insertLayoutBlockSchema = createInsertSchema(layoutBlocks).pick({
  pageId: true,
  type: true,
  content: true,
  order: true,
  isVisible: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  rating: true,
  text: true,
  date: true,
  isVisible: true,
  order: true,
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).pick({
  title: true,
  imageUrl: true,
  alt: true,
  category: true,
  isVisible: true,
  order: true,
});

export const insertUploadedFileSchema = createInsertSchema(uploadedFiles).pick({
  filename: true,
  originalName: true,
  mimeType: true,
  size: true,
  path: true,
  url: true,
  uploadedBy: true,
});

export const insertHeaderConfigSchema = createInsertSchema(headerConfig).pick({
  logoUrl: true,
  logoAlt: true,
  navigationItems: true,
  contactPhone: true,
  contactText: true,
  ctaText: true,
  ctaLink: true,
  topBarEnabled: true,
  topBarPhone: true,
  topBarAddress: true,
  topBarBackgroundType: true,
  topBarBackgroundColor: true,
  topBarBackgroundImage: true,
  topBarGradientFrom: true,
  topBarGradientTo: true,
  topBarTextColor: true,
  topBarLinks: true,
  mainNavBackgroundColor: true,
  mainNavTextColor: true,
  backgroundColor: true,
  backgroundType: true,
  backgroundImage: true,
  gradientFrom: true,
  gradientTo: true,
  textColor: true,
  linkColor: true,
  linkHoverColor: true,
  isActive: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertLayoutBlock = z.infer<typeof insertLayoutBlockSchema>;
export type LayoutBlock = typeof layoutBlocks.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertUploadedFile = z.infer<typeof insertUploadedFileSchema>;
export type UploadedFile = typeof uploadedFiles.$inferSelect;
export type InsertHeaderConfig = z.infer<typeof insertHeaderConfigSchema>;
export type HeaderConfig = typeof headerConfig.$inferSelect;

import { type User, type InsertUser, type Page, type InsertPage, type LayoutBlock, type InsertLayoutBlock, type Testimonial, type InsertTestimonial, type GalleryImage, type InsertGalleryImage, type UploadedFile, type InsertUploadedFile, type HeaderConfig, type InsertHeaderConfig } from "@shared/schema";
import { randomUUID } from "crypto";
// Conditional imports for database functionality
let db: any = null;
let users: any, pages: any, layoutBlocks: any, testimonials: any, galleryImages: any, uploadedFiles: any, headerConfig: any;
let eq: any = null;

// Only import database modules if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  try {
    const dbModule = require("./db");
    db = dbModule.db;
    const schemaModule = require("@shared/schema");
    users = schemaModule.users;
    pages = schemaModule.pages;
    layoutBlocks = schemaModule.layoutBlocks;
    testimonials = schemaModule.testimonials;
    galleryImages = schemaModule.galleryImages;
    uploadedFiles = schemaModule.uploadedFiles;
    headerConfig = schemaModule.headerConfig;
    const drizzleModule = require("drizzle-orm");
    eq = drizzleModule.eq;
  } catch (error) {
    console.warn("Database modules not available, using memory storage");
  }
}

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Pages
  getPage(id: string): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, updates: Partial<Page>): Promise<Page | undefined>;

  // Layout Blocks
  getLayoutBlock(id: string): Promise<LayoutBlock | undefined>;
  getLayoutBlocksByPageId(pageId: string): Promise<LayoutBlock[]>;
  getLayoutBlocksByPageSlug(slug: string): Promise<LayoutBlock[]>;
  createLayoutBlock(block: InsertLayoutBlock): Promise<LayoutBlock>;
  updateLayoutBlock(id: string, updates: Partial<LayoutBlock>): Promise<LayoutBlock | undefined>;
  deleteLayoutBlock(id: string): Promise<boolean>;
  reorderLayoutBlocks(blocks: Array<{ id: string; order: number }>): Promise<void>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  // Gallery Images
  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: string): Promise<boolean>;

  // File Uploads
  getUploadedFile(id: string): Promise<UploadedFile | undefined>;
  getUploadedFiles(): Promise<UploadedFile[]>;
  createUploadedFile(file: InsertUploadedFile): Promise<UploadedFile>;
  deleteUploadedFile(id: string): Promise<boolean>;

  // Header Configuration
  getHeaderConfig(): Promise<HeaderConfig | undefined>;
  createHeaderConfig(config: InsertHeaderConfig): Promise<HeaderConfig>;
  updateHeaderConfig(id: string, updates: Partial<HeaderConfig>): Promise<HeaderConfig | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private pages: Map<string, Page> = new Map();
  private layoutBlocks: Map<string, LayoutBlock> = new Map();
  private testimonials: Map<string, Testimonial> = new Map();
  private galleryImages: Map<string, GalleryImage> = new Map();
  private uploadedFiles: Map<string, UploadedFile> = new Map();
  private headerConfigs: Map<string, HeaderConfig> = new Map();

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default admin user
    const adminUser: User = {
      id: randomUUID(),
      email: 'admin@tubsoffun.com',
      password: '$2b$10$defaulthashedpassword', // In real app, this would be properly hashed
      role: 'admin',
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create homepage
    const homepage: Page = {
      id: randomUUID(),
      slug: 'homepage',
      title: 'Tubs of Fun! - Hot Tubs, Swim Spas, Pools & More',
      metaDescription: 'Family time made simple! Quality hot tubs, swim spas, pools, saunas, and game room essentials in West Fargo, ND.',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.pages.set(homepage.id, homepage);

    // Create default layout blocks
    const heroBlock: LayoutBlock = {
      id: randomUUID(),
      pageId: homepage.id,
      type: 'hero',
      content: {
        title: 'FAMILY TIME MADE SIMPLE!!!',
        subtitle: 'Let us help you transform your space',
        description: 'Our friendly and knowledgeable staff are here to show you our amazing Hot tubs, Swim spas, Pools, Saunas, and more!',
        ctaPrimary: 'Schedule Your Visit',
        ctaSecondary: 'View Products',
        imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
      },
      order: 1,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.layoutBlocks.set(heroBlock.id, heroBlock);

    const aboutBlock: LayoutBlock = {
      id: randomUUID(),
      pageId: homepage.id,
      type: 'about',
      content: {
        title: 'ABOUT US',
        subtitle: 'MEET THE FOUNDER & CEO',
        founderName: 'Hi, I\'m Troy!',
        description: 'Our business began in 1991, as a hot tub rental company. We grew that company into a hot tub superstore. Our founder and CEO Troy Derheim eventually sold Tubs of Fun! to focus on designing and building swimming pools, splash pads, and specialty aquatic therapy products. Now, by customer request, and a passion re-imagined, we are back! Fully committed to serving the great people of our community with quality products and unmatched service.',
        ctaText: 'See more',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600'
      },
      order: 2,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.layoutBlocks.set(aboutBlock.id, aboutBlock);

    const servicesBlock: LayoutBlock = {
      id: randomUUID(),
      pageId: homepage.id,
      type: 'services',
      content: {
        title: 'Our Services',
        services: [
          {
            title: "HOT TUBS",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
            description: "Luxury hot tubs for relaxation and therapy"
          },
          {
            title: "SAUNAS",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
            description: "Traditional and infrared saunas for wellness"
          },
          {
            title: "POOLS",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
            description: "Above ground and in-ground swimming pools"
          },
          {
            title: "SWIM SPAS",
            image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
            description: "Exercise and relaxation in one unit"
          }
        ]
      },
      order: 3,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.layoutBlocks.set(servicesBlock.id, servicesBlock);

    // Initialize testimonials
    const defaultTestimonials = [
      {
        id: randomUUID(),
        name: "Mort Sarabakhsh",
        rating: 5,
        text: "I would like to recognize Tubs of Fun for great service and pool installation. They have great staff for help and support with cleaning products and pool equipment repair.",
        date: "Jun 20, 2025",
        isVisible: true,
        order: 1,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Darci Phillips",
        rating: 5,
        text: "I had an issue with my new heater I ordered from an online store. The online store wouldn't help me and the manufacturer wouldn't help me. Troy immediately said he would help us troubleshoot. Don't buy your pool heaters online!",
        date: "Jun 11, 2025",
        isVisible: true,
        order: 2,
        createdAt: new Date(),
      }
    ];

    defaultTestimonials.forEach(testimonial => {
      this.testimonials.set(testimonial.id, testimonial);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: randomUUID(),
      role: insertUser.role || 'admin',
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Pages
  async getPage(id: string): Promise<Page | undefined> {
    return this.pages.get(id);
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    return Array.from(this.pages.values()).find(page => page.slug === slug);
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const page: Page = {
      ...insertPage,
      id: randomUUID(),
      metaDescription: insertPage.metaDescription || null,
      isPublished: insertPage.isPublished ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.pages.set(page.id, page);
    return page;
  }

  async updatePage(id: string, updates: Partial<Page>): Promise<Page | undefined> {
    const page = this.pages.get(id);
    if (!page) return undefined;
    
    const updatedPage = { ...page, ...updates, updatedAt: new Date() };
    this.pages.set(id, updatedPage);
    return updatedPage;
  }

  // Layout Blocks
  async getLayoutBlock(id: string): Promise<LayoutBlock | undefined> {
    return this.layoutBlocks.get(id);
  }

  async getLayoutBlocksByPageId(pageId: string): Promise<LayoutBlock[]> {
    return Array.from(this.layoutBlocks.values())
      .filter(block => block.pageId === pageId)
      .sort((a, b) => a.order - b.order);
  }

  async getLayoutBlocksByPageSlug(slug: string): Promise<LayoutBlock[]> {
    const page = await this.getPageBySlug(slug);
    if (!page) return [];
    return this.getLayoutBlocksByPageId(page.id);
  }

  async createLayoutBlock(insertBlock: InsertLayoutBlock): Promise<LayoutBlock> {
    const block: LayoutBlock = {
      ...insertBlock,
      id: randomUUID(),
      isVisible: insertBlock.isVisible ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.layoutBlocks.set(block.id, block);
    return block;
  }

  async updateLayoutBlock(id: string, updates: Partial<LayoutBlock>): Promise<LayoutBlock | undefined> {
    const block = this.layoutBlocks.get(id);
    if (!block) return undefined;
    
    const updatedBlock = { ...block, ...updates, updatedAt: new Date() };
    this.layoutBlocks.set(id, updatedBlock);
    return updatedBlock;
  }

  async deleteLayoutBlock(id: string): Promise<boolean> {
    return this.layoutBlocks.delete(id);
  }

  async reorderLayoutBlocks(blocks: Array<{ id: string; order: number }>): Promise<void> {
    for (const { id, order } of blocks) {
      const block = this.layoutBlocks.get(id);
      if (block) {
        this.layoutBlocks.set(id, { ...block, order, updatedAt: new Date() });
      }
    }
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(testimonial => testimonial.isVisible)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id: randomUUID(),
      order: insertTestimonial.order || 0,
      isVisible: insertTestimonial.isVisible ?? true,
      createdAt: new Date(),
    };
    this.testimonials.set(testimonial.id, testimonial);
    return testimonial;
  }

  async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | undefined> {
    const testimonial = this.testimonials.get(id);
    if (!testimonial) return undefined;
    
    const updatedTestimonial = { ...testimonial, ...updates };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Gallery Images
  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values())
      .filter(image => image.isVisible)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const image: GalleryImage = {
      ...insertImage,
      id: randomUUID(),
      order: insertImage.order || 0,
      isVisible: insertImage.isVisible ?? true,
      category: insertImage.category || 'general',
      createdAt: new Date(),
    };
    this.galleryImages.set(image.id, image);
    return image;
  }

  async updateGalleryImage(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage | undefined> {
    const image = this.galleryImages.get(id);
    if (!image) return undefined;
    
    const updatedImage = { ...image, ...updates };
    this.galleryImages.set(id, updatedImage);
    return updatedImage;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  // File Uploads
  async getUploadedFile(id: string): Promise<UploadedFile | undefined> {
    return this.uploadedFiles.get(id);
  }

  async getUploadedFiles(): Promise<UploadedFile[]> {
    return Array.from(this.uploadedFiles.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createUploadedFile(insertFile: InsertUploadedFile): Promise<UploadedFile> {
    const file: UploadedFile = {
      ...insertFile,
      id: randomUUID(),
      uploadedBy: insertFile.uploadedBy || null,
      createdAt: new Date(),
    };
    this.uploadedFiles.set(file.id, file);
    return file;
  }

  async deleteUploadedFile(id: string): Promise<boolean> {
    return this.uploadedFiles.delete(id);
  }

  // Header Configuration
  async getHeaderConfig(): Promise<HeaderConfig | undefined> {
    const configs = Array.from(this.headerConfigs.values());
    return configs.find(config => config.isActive);
  }

  async createHeaderConfig(insertConfig: InsertHeaderConfig): Promise<HeaderConfig> {
    // Deactivate existing active configs
    const configs = Array.from(this.headerConfigs.values());
    for (const config of configs) {
      if (config.isActive) {
        this.headerConfigs.set(config.id, { ...config, isActive: false });
      }
    }

    const config: HeaderConfig = {
      id: randomUUID(),
      logoUrl: insertConfig.logoUrl || null,
      logoAlt: insertConfig.logoAlt || 'Logo',
      navigationItems: insertConfig.navigationItems || [],
      contactPhone: insertConfig.contactPhone || null,
      contactText: insertConfig.contactText || null,
      ctaText: insertConfig.ctaText || null,
      ctaLink: insertConfig.ctaLink || null,
      backgroundColor: insertConfig.backgroundColor || '#ffffff',
      backgroundType: insertConfig.backgroundType || 'solid',
      backgroundImage: insertConfig.backgroundImage || null,
      gradientFrom: insertConfig.gradientFrom || null,
      gradientTo: insertConfig.gradientTo || null,
      textColor: insertConfig.textColor || '#000000',
      linkColor: insertConfig.linkColor || '#2563eb',
      linkHoverColor: insertConfig.linkHoverColor || '#1d4ed8',
      isActive: insertConfig.isActive ?? true,
      updatedAt: new Date(),
    };
    this.headerConfigs.set(config.id, config);
    return config;
  }

  async updateHeaderConfig(id: string, updates: Partial<HeaderConfig>): Promise<HeaderConfig | undefined> {
    const config = this.headerConfigs.get(id);
    if (!config) return undefined;

    // If setting this one to active, deactivate others
    if (updates.isActive) {
      const configs = Array.from(this.headerConfigs.values());
      for (const existingConfig of configs) {
        if (existingConfig.id !== id && existingConfig.isActive) {
          this.headerConfigs.set(existingConfig.id, { ...existingConfig, isActive: false });
        }
      }
    }
    
    const updatedConfig = { ...config, ...updates, updatedAt: new Date() };
    this.headerConfigs.set(id, updatedConfig);
    return updatedConfig;
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getPage(id: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page || undefined;
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const [page] = await db
      .insert(pages)
      .values(insertPage)
      .returning();
    return page;
  }

  async updatePage(id: string, updates: Partial<Page>): Promise<Page | undefined> {
    const [page] = await db
      .update(pages)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return page || undefined;
  }

  async getLayoutBlock(id: string): Promise<LayoutBlock | undefined> {
    const [block] = await db.select().from(layoutBlocks).where(eq(layoutBlocks.id, id));
    return block || undefined;
  }

  async getLayoutBlocksByPageId(pageId: string): Promise<LayoutBlock[]> {
    return await db.select().from(layoutBlocks).where(eq(layoutBlocks.pageId, pageId));
  }

  async getLayoutBlocksByPageSlug(slug: string): Promise<LayoutBlock[]> {
    const page = await this.getPageBySlug(slug);
    if (!page) return [];
    return this.getLayoutBlocksByPageId(page.id);
  }

  async createLayoutBlock(insertBlock: InsertLayoutBlock): Promise<LayoutBlock> {
    const [block] = await db
      .insert(layoutBlocks)
      .values(insertBlock)
      .returning();
    return block;
  }

  async updateLayoutBlock(id: string, updates: Partial<LayoutBlock>): Promise<LayoutBlock | undefined> {
    const [block] = await db
      .update(layoutBlocks)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(layoutBlocks.id, id))
      .returning();
    return block || undefined;
  }

  async deleteLayoutBlock(id: string): Promise<boolean> {
    const result = await db.delete(layoutBlocks).where(eq(layoutBlocks.id, id));
    return (result.rowCount || 0) > 0;
  }

  async reorderLayoutBlocks(blocks: Array<{ id: string; order: number }>): Promise<void> {
    for (const block of blocks) {
      await db
        .update(layoutBlocks)
        .set({ order: block.order, updatedAt: new Date() })
        .where(eq(layoutBlocks.id, block.id));
    }
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }

  async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | undefined> {
    const [testimonial] = await db
      .update(testimonials)
      .set(updates)
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial || undefined;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages);
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const [image] = await db
      .insert(galleryImages)
      .values(insertImage)
      .returning();
    return image;
  }

  async updateGalleryImage(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage | undefined> {
    const [image] = await db
      .update(galleryImages)
      .set(updates)
      .where(eq(galleryImages.id, id))
      .returning();
    return image || undefined;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    const result = await db.delete(galleryImages).where(eq(galleryImages.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getUploadedFile(id: string): Promise<UploadedFile | undefined> {
    const [file] = await db.select().from(uploadedFiles).where(eq(uploadedFiles.id, id));
    return file || undefined;
  }

  async getUploadedFiles(): Promise<UploadedFile[]> {
    return await db.select().from(uploadedFiles);
  }

  async createUploadedFile(insertFile: InsertUploadedFile): Promise<UploadedFile> {
    const [file] = await db
      .insert(uploadedFiles)
      .values(insertFile)
      .returning();
    return file;
  }

  async deleteUploadedFile(id: string): Promise<boolean> {
    const result = await db.delete(uploadedFiles).where(eq(uploadedFiles.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getHeaderConfig(): Promise<HeaderConfig | undefined> {
    const [config] = await db.select().from(headerConfig).where(eq(headerConfig.isActive, true));
    return config || undefined;
  }

  async createHeaderConfig(insertConfig: InsertHeaderConfig): Promise<HeaderConfig> {
    // Deactivate existing active configs
    await db
      .update(headerConfig)
      .set({ isActive: false })
      .where(eq(headerConfig.isActive, true));

    const [config] = await db
      .insert(headerConfig)
      .values({ ...insertConfig, isActive: true })
      .returning();
    return config;
  }

  async updateHeaderConfig(id: string, updates: Partial<HeaderConfig>): Promise<HeaderConfig | undefined> {
    // If setting this one to active, deactivate others
    if (updates.isActive) {
      await db
        .update(headerConfig)
        .set({ isActive: false })
        .where(eq(headerConfig.isActive, true));
    }

    const [config] = await db
      .update(headerConfig)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(headerConfig.id, id))
      .returning();
    return config || undefined;
  }
}

// Use database storage if DATABASE_URL is provided, otherwise fallback to memory storage
const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
export { storage };

import type { Express } from "express";
import { createServer, type Server } from "http";
import { getStorage } from "./storage";
import { insertLayoutBlockSchema, insertPageSchema, insertTestimonialSchema, insertGalleryImageSchema, insertUploadedFileSchema, insertHeaderConfigSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import express from "express";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure upload directory exists
  await fs.mkdir(uploadDir, { recursive: true });
  
  // Serve uploaded files statically
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use('/uploads', express.static(uploadDir));
  // Auth
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Simple admin auth check
      if (email === 'admin@tubsoffun.com' && password === 'admin123') {
        const user = {
          id: '1',
          email: 'admin@tubsoffun.com',
          role: 'admin'
        };
        res.json({ user });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to authenticate' });
    }
  });

  // Pages
  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const storage = await getStorage();
      const page = await storage.getPageBySlug(slug);
      
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/pages", async (req, res) => {
    try {
      const validatedData = insertPageSchema.parse(req.body);
      const storage = await getStorage();
      const page = await storage.createPage(validatedData);
      res.status(201).json(page);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Layout Blocks
  app.get("/api/layout-blocks/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const storage = await getStorage();
      const blocks = await storage.getLayoutBlocksByPageSlug(slug);
      res.json(blocks);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/layout-blocks", async (req, res) => {
    try {
      const validatedData = insertLayoutBlockSchema.parse(req.body);
      const storage = await getStorage();
      const block = await storage.createLayoutBlock(validatedData);
      res.status(201).json(block);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/layout-blocks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const storage = await getStorage();
      const block = await storage.updateLayoutBlock(id, updates);
      
      if (!block) {
        return res.status(404).json({ message: "Block not found" });
      }
      
      res.json(block);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/layout-blocks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const storage = await getStorage();
      const success = await storage.deleteLayoutBlock(id);
      
      if (!success) {
        return res.status(404).json({ message: "Block not found" });
      }
      
      res.json({ message: "Block deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/layout-blocks/reorder", async (req, res) => {
    try {
      const { blocks } = req.body;
      
      if (!Array.isArray(blocks)) {
        return res.status(400).json({ message: "Blocks must be an array" });
      }
      
      const reorderData = blocks.map((block, index) => ({
        id: block.id,
        order: index + 1
      }));
      
      const storage = await getStorage();
      await storage.reorderLayoutBlocks(reorderData);
      res.json({ message: "Blocks reordered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const storage = await getStorage();
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const storage = await getStorage();
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const storage = await getStorage();
      const testimonial = await storage.updateTestimonial(id, updates);
      
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const storage = await getStorage();
      const success = await storage.deleteTestimonial(id);
      
      if (!success) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json({ message: "Testimonial deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Gallery Images
  app.get("/api/gallery", async (req, res) => {
    try {
      const storage = await getStorage();
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const storage = await getStorage();
      const image = await storage.createGalleryImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/gallery/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const storage = await getStorage();
      const image = await storage.updateGalleryImage(id, updates);
      
      if (!image) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
      
      res.json(image);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const storage = await getStorage();
      const success = await storage.deleteGalleryImage(id);
      
      if (!success) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
      
      res.json({ message: "Gallery image deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Authentication endpoint (for demonstration - in production use proper auth)
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // In a real app, you'd verify the password hash
      const storage = await getStorage();
      const user = await storage.getUserByEmail(email);
      
      if (!user || password !== 'admin123') { // Simple demo auth
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ 
        user: { 
          id: user.id, 
          email: user.email, 
          role: user.role 
        } 
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // File Upload
  app.post("/api/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        url: `/uploads/${req.file.filename}`,
        uploadedBy: null, // Would be from session in real app
      };

      const storage = await getStorage();
      const uploadedFile = await storage.createUploadedFile(fileData);
      res.json({ 
        url: uploadedFile.url,
        id: uploadedFile.id,
        filename: uploadedFile.filename 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: "Upload failed" });
    }
  });

  // Header Configuration
  app.get("/api/header-config", async (req, res) => {
    try {
      const storage = await getStorage();
      const config = await storage.getHeaderConfig();
      res.json(config || {});
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/header-config", async (req, res) => {
    try {
      const validatedData = insertHeaderConfigSchema.parse(req.body);
      const storage = await getStorage();
      const config = await storage.createHeaderConfig(validatedData);
      res.status(201).json(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/header-config/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const storage = await getStorage();
      const config = await storage.updateHeaderConfig(id, updates);
      
      if (!config) {
        return res.status(404).json({ message: "Header config not found" });
      }
      
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

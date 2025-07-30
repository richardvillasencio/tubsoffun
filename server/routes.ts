import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLayoutBlockSchema, insertPageSchema, insertTestimonialSchema, insertGalleryImageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
      const blocks = await storage.getLayoutBlocksByPageSlug(slug);
      res.json(blocks);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/layout-blocks", async (req, res) => {
    try {
      const validatedData = insertLayoutBlockSchema.parse(req.body);
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
      
      await storage.reorderLayoutBlocks(reorderData);
      res.json({ message: "Blocks reordered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
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
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
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

  const httpServer = createServer(app);
  return httpServer;
}

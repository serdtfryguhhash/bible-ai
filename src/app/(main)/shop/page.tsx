"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, Filter, Search, ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product } from "@/types";

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    shopify_id: "shop-1",
    title: "Leather-Bound Prayer Journal",
    description: "Handcrafted Italian leather journal with guided prayer prompts, scripture pages, and gold-edged paper. 240 pages of pure writing bliss.",
    price: 34.99,
    compare_at_price: 44.99,
    images: [],
    category: "journals",
    variants: [
      { id: "v1", title: "Tan", price: 34.99, available: true, option1: "Tan" },
      { id: "v2", title: "Dark Brown", price: 34.99, available: true, option1: "Dark Brown" },
      { id: "v3", title: "Black", price: 34.99, available: true, option1: "Black" },
    ],
    in_stock: true,
    created_at: "2024-01-01",
  },
  {
    id: "prod-2",
    shopify_id: "shop-2",
    title: "\"Be Still\" Premium Tee",
    description: "Ultra-soft tri-blend tee featuring Psalm 46:10. Minimalist design that sparks conversations about faith.",
    price: 29.99,
    images: [],
    category: "apparel",
    variants: [
      { id: "v4", title: "S", price: 29.99, available: true, option1: "S" },
      { id: "v5", title: "M", price: 29.99, available: true, option1: "M" },
      { id: "v6", title: "L", price: 29.99, available: true, option1: "L" },
      { id: "v7", title: "XL", price: 29.99, available: true, option1: "XL" },
    ],
    in_stock: true,
    created_at: "2024-01-01",
  },
  {
    id: "prod-3",
    shopify_id: "shop-3",
    title: "Psalm 23 Watercolor Art Print",
    description: "Museum-quality giclée print of Psalm 23 with hand-painted watercolor mountains. Archival inks on premium matte paper.",
    price: 24.99,
    images: [],
    category: "art",
    variants: [
      { id: "v8", title: "8x10", price: 24.99, available: true, option1: "8x10" },
      { id: "v9", title: "11x14", price: 34.99, available: true, option1: "11x14" },
      { id: "v10", title: "16x20", price: 49.99, available: true, option1: "16x20" },
    ],
    in_stock: true,
    created_at: "2024-01-01",
  },
  {
    id: "prod-4",
    shopify_id: "shop-4",
    title: "\"Faith Over Fear\" Ceramic Mug",
    description: "Premium 15oz ceramic mug with gold foil lettering. Microwave and dishwasher safe. Start your morning with faith.",
    price: 18.99,
    images: [],
    category: "accessories",
    variants: [
      { id: "v11", title: "White", price: 18.99, available: true, option1: "White" },
      { id: "v12", title: "Cream", price: 18.99, available: true, option1: "Cream" },
    ],
    in_stock: true,
    created_at: "2024-01-01",
  },
  {
    id: "prod-5",
    shopify_id: "shop-5",
    title: "Scripture Memory Card Set",
    description: "50 beautifully designed cards with key Bible verses for memorization. Comes in a wooden display box.",
    price: 22.99,
    images: [],
    category: "accessories",
    variants: [{ id: "v13", title: "Standard", price: 22.99, available: true }],
    in_stock: true,
    created_at: "2024-01-01",
  },
  {
    id: "prod-6",
    shopify_id: "shop-6",
    title: "\"Fearfully & Wonderfully Made\" Hoodie",
    description: "Cozy heavyweight hoodie with embroidered Psalm 139:14 on the chest. Perfect for cool evenings and warm hearts.",
    price: 49.99,
    compare_at_price: 59.99,
    images: [],
    category: "apparel",
    variants: [
      { id: "v14", title: "S", price: 49.99, available: true, option1: "S" },
      { id: "v15", title: "M", price: 49.99, available: true, option1: "M" },
      { id: "v16", title: "L", price: 49.99, available: true, option1: "L" },
    ],
    in_stock: true,
    created_at: "2024-01-01",
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<{ productId: string; variantId: string; quantity: number }[]>([]);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const addToCart = (productId: string, variantId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.variantId === variantId);
      if (existing) {
        return prev.map((i) => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { productId, variantId, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen parchment-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-accent-500" />
              Faith Shop
            </h1>
            <p className="text-warm-500 mt-1">Premium faith products designed to inspire your daily walk.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="gold">
              <Tag className="w-3 h-3 mr-1" />
              Disciple members save 15%
            </Badge>
            <Button variant="outline" className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-3.5 h-3.5 mr-1.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="journals">Journals</SelectItem>
              <SelectItem value="apparel">Apparel</SelectItem>
              <SelectItem value="art">Art Prints</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-all group overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-warm-50 to-warm-100 flex items-center justify-center relative">
                  <ShoppingBag className="w-16 h-16 text-warm-200 group-hover:text-accent-300 transition-colors" />
                  {product.compare_at_price && (
                    <Badge variant="destructive" className="absolute top-3 left-3">
                      SALE
                    </Badge>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? "fill-red-500 text-red-500" : "text-warm-400"}`} />
                  </button>
                </div>
                <CardContent className="pt-4">
                  <Badge variant="outline" className="text-[10px] mb-2">{product.category}</Badge>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-1 group-hover:text-accent-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-warm-500 line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                    {product.compare_at_price && (
                      <span className="text-sm text-warm-400 line-through">${product.compare_at_price.toFixed(2)}</span>
                    )}
                  </div>
                  {product.variants.length > 1 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {product.variants.map((v) => (
                        <Badge key={v.id} variant="outline" className="text-[10px] cursor-pointer hover:bg-primary-50">
                          {v.option1 || v.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
                    ))}
                    <span className="text-xs text-warm-400 ml-1">(4.9)</span>
                  </div>
                  <Button
                    variant="gold"
                    className="w-full"
                    onClick={() => addToCart(product.id, product.variants[0].id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1.5" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

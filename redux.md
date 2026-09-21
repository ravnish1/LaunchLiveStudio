# Centralized Redux Store Architecture — Launch Live Studio

> **Single Source of Truth** for global client-side state, interactive estimation funnels, UI micro-interactions, portfolio/blog filtering, and lead persistence in Launch Live Studio. Built specifically for **Next.js 16 (App Router)**, **React 19**, and **TypeScript**.

---

## 1. Executive Summary & Architecture Philosophy

Launch Live Studio combines high-contrast boutique aesthetics (*Warm Editorial Tech*) with high-performance digital engineering. To deliver frictionless client interactions—such as instant portfolio filtering, multi-step project cost calculation, persistent lead drafts, and seamless navigation modals—the application requires a centralized, type-safe state layer.

### Core Architectural Principles

1. **SSR Isolation & Per-Request Safety (Next.js 16 / React 19):**
   - On the server, a new Redux store instance is created per request via the `makeStore` factory pattern, preventing cross-request state pollution or user session leaks.
   - On the client, the store is created once and stored in a React `useRef` inside a dedicated client `<StoreProvider>`.
2. **Strict Client/Server Separation:**
   - Server Components remain pure Server Components (fetching data, rendering metadata, static SEO).
   - Redux hooks (`useAppDispatch`, `useAppSelector`) are consumed exclusively within `'use client'` interactive leaves and containers.
3. **Domain-Driven Slice Modularization:**
   - State is partitioned into discrete domain slices: `ui`, `leadEstimate`, `work`, `blog`, `services`, and `preferences`.
4. **Optimized Selectors with Memoization (`createSelector`):**
   - Heavy filter operations (e.g., searching 50+ blog articles or filtering case studies by category) run through memoized selectors to eliminate redundant component re-renders.
5. **Session & LocalStorage Hydration:**
   - Sensitive user inputs (e.g., in-progress quote estimations, bookmarks, and UI preferences) are synced seamlessly without causing hydration mismatch errors.

---

## 2. Directory Structure Blueprint

All Redux-related files live inside `lib/redux/` (or `store/`), structured as follows:

```
lib/redux/
├── store.ts               # Store factory (makeStore), RootState, AppDispatch, AppStore types
├── provider.tsx           # 'use client' StoreProvider wrapper for Next.js 16
├── hooks.ts               # Typed hooks: useAppDispatch, useAppSelector, useAppStore
├── middleware/
│   ├── persistence.ts     # LocalStorage hydration & persistence middleware
│   └── analytics.ts       # Action-level event dispatch to Vercel/Google Analytics
├── slices/
│   ├── uiSlice.ts         # Navigation, modals, mobile menu, cursor, ambient audio
│   ├── leadEstimateSlice.ts # Interactive quote builder, multi-step inquiry, contact form
│   ├── workSlice.ts       # Portfolio filter, category tabs, active case study drawer
│   ├── blogSlice.ts       # Live blog search, category filters, bookmarks, reading progress
│   ├── servicesSlice.ts   # Service configurator, active tabs, feature comparison
│   └── preferencesSlice.ts# User preferences (theme, motion, sound, cookie consent)
└── thunks/
    ├── contactThunks.ts   # Async contact submission to /api/contact
    └── newsletterThunks.ts# Async newsletter subscription handler
```

---

## 3. Package Dependencies

Install the core Redux Toolkit and React-Redux packages:

```bash
npm install @reduxjs/toolkit react-redux
```

*Note: In TypeScript Next.js 16 projects, types are bundled within `@reduxjs/toolkit` and `react-redux`.*

---

## 4. Implementation Specifications

### 4.1 Store Factory & Types (`lib/redux/store.ts`)

```typescript
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import leadEstimateReducer from './slices/leadEstimateSlice';
import workReducer from './slices/workSlice';
import blogReducer from './slices/blogSlice';
import servicesReducer from './slices/servicesSlice';
import preferencesReducer from './slices/preferencesSlice';
import { persistenceMiddleware } from './middleware/persistence';
import { analyticsMiddleware } from './middleware/analytics';

const rootReducer = combineReducers({
  ui: uiReducer,
  leadEstimate: leadEstimateReducer,
  work: workReducer,
  blog: blogReducer,
  services: servicesReducer,
  preferences: preferencesReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore non-serializable actions/paths if needed
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(persistenceMiddleware, analyticsMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Type definitions inferred from makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

---

### 4.2 Next.js 16 Client Store Provider (`lib/redux/provider.tsx`)

In Next.js App Router, the store must not be a global singleton on the module level. Instead, we instantiate it once per client lifecycle inside a `useRef`.

```tsx
'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

---

### 4.3 Typed Custom Hooks (`lib/redux/hooks.ts`)

```typescript
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch, AppStore } from './store';

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
```

---

### 4.4 Slice Specifications & Complete Implementations

#### A. UI & Navigation Slice (`lib/redux/slices/uiSlice.ts`)
Manages navigation bar scroll state, mobile menu toggle, interactive modal dialogs (Lead capture, Cal.com scheduling, Video case studies), and dynamic custom cursor states.

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType = 
  | 'leadCapture' 
  | 'quickQuote' 
  | 'calScheduler' 
  | 'caseStudyDrawer' 
  | 'globalSearch' 
  | null;

export type CursorVariant = 'default' | 'pointer' | 'text' | 'explore' | 'drag';

interface UIState {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  activeModal: ModalType;
  modalPayload: Record<string, any> | null;
  cursorVariant: CursorVariant;
  cursorText: string;
  isAudioMuted: boolean;
  activeToast: {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
  } | null;
}

const initialState: UIState = {
  isScrolled: false,
  isMobileMenuOpen: false,
  activeModal: null,
  modalPayload: null,
  cursorVariant: 'default',
  cursorText: '',
  isAudioMuted: true,
  activeToast: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    openModal: (
      state, 
      action: PayloadAction<{ modal: ModalType; payload?: Record<string, any> }>
    ) => {
      state.activeModal = action.payload.modal;
      state.modalPayload = action.payload.payload || null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalPayload = null;
    },
    setCursorVariant: (
      state, 
      action: PayloadAction<{ variant: CursorVariant; text?: string }>
    ) => {
      state.cursorVariant = action.payload.variant;
      state.cursorText = action.payload.text || '';
    },
    resetCursor: (state) => {
      state.cursorVariant = 'default';
      state.cursorText = '';
    },
    toggleAudio: (state) => {
      state.isAudioMuted = !state.isAudioMuted;
    },
    setToast: (
      state, 
      action: PayloadAction<UIState['activeToast']>
    ) => {
      state.activeToast = action.payload;
    },
    clearToast: (state) => {
      state.activeToast = null;
    },
  },
});

export const {
  setIsScrolled,
  toggleMobileMenu,
  setMobileMenuOpen,
  openModal,
  closeModal,
  setCursorVariant,
  resetCursor,
  toggleAudio,
  setToast,
  clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;
```

---

#### B. Lead & Project Estimation Slice (`lib/redux/slices/leadEstimateSlice.ts`)
Controls the agency's interactive multi-step project cost calculator, quote generator, and consultation contact form drafts.

```typescript
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ServiceSelection {
  id: string;
  name: string;
  basePrice: number;
  category: 'web' | 'ai' | 'branding' | 'ecommerce' | 'seo';
}

export interface LeadFormData {
  name: string;
  email: string;
  company: string;
  timeline: 'asap' | '1-month' | '3-months' | 'flexible';
  budgetBracket: '<$5k' | '$5k-$15k' | '$15k-$30k' | '$30k+';
  selectedServices: string[]; // service IDs
  projectDetails: string;
}

interface LeadEstimateState {
  currentStep: number;
  formData: LeadFormData;
  estimatedTotal: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorMessage: string | null;
  lastSubmittedId: string | null;
}

const initialState: LeadEstimateState = {
  currentStep: 1,
  formData: {
    name: '',
    email: '',
    company: '',
    timeline: '1-month',
    budgetBracket: '$5k-$15k',
    selectedServices: ['websites'],
    projectDetails: '',
  },
  estimatedTotal: 3500,
  status: 'idle',
  errorMessage: null,
  lastSubmittedId: null,
};

// Pricing matrix mapping
const SERVICE_RATES: Record<string, number> = {
  websites: 3500,
  automation: 2500,
  branding: 2000,
  ecommerce: 4500,
  seo: 1500,
  rag_platform: 5000,
};

export const submitLeadInquiry = createAsyncThunk(
  'leadEstimate/submitInquiry',
  async (payload: LeadFormData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || 'Failed to submit inquiry.');
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error occurred.');
    }
  }
);

export const leadEstimateSlice = createSlice({
  name: 'leadEstimate',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    updateFormField: <K extends keyof LeadFormData>(
      state: LeadEstimateState,
      action: PayloadAction<{ field: K; value: LeadFormData[K] }>
    ) => {
      state.formData[action.payload.field] = action.payload.value;
      
      // Auto-recalculate estimate if services changed
      if (action.payload.field === 'selectedServices') {
        const services = action.payload.value as string[];
        state.estimatedTotal = services.reduce(
          (acc, serviceId) => acc + (SERVICE_RATES[serviceId] || 1000), 
          0
        );
      }
    },
    toggleService: (state, action: PayloadAction<string>) => {
      const serviceId = action.payload;
      const index = state.formData.selectedServices.indexOf(serviceId);
      if (index >= 0) {
        state.formData.selectedServices.splice(index, 1);
      } else {
        state.formData.selectedServices.push(serviceId);
      }
      // Recalculate
      state.estimatedTotal = state.formData.selectedServices.reduce(
        (acc, id) => acc + (SERVICE_RATES[id] || 1000),
        0
      );
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.currentStep = 1;
      state.status = 'idle';
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLeadInquiry.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(submitLeadInquiry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastSubmittedId = action.payload?.id || 'SUBMITTED';
      })
      .addCase(submitLeadInquiry.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload as string;
      });
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  updateFormField,
  toggleService,
  resetForm,
} = leadEstimateSlice.actions;

export default leadEstimateSlice.reducer;
```

---

#### C. Portfolio & Work Slice (`lib/redux/slices/workSlice.ts`)
Manages live filtering across agency projects by technology/industry (AI/ML, Shopify, DTC, B2B), search queries, and modal case study triggers.

```typescript
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type WorkCategory = 
  | 'All' 
  | 'AI / ML' 
  | 'B2B / Trust & Safety' 
  | 'DTC / E-commerce' 
  | 'Shopify / Streetwear' 
  | 'BIM Designing' 
  | 'Tensile and Fabrications' 
  | 'Event and Tent Rentals';

interface WorkState {
  activeCategory: WorkCategory;
  searchQuery: string;
  selectedProjectSlug: string | null;
  viewMode: 'grid' | 'cards' | 'spotlight';
}

const initialState: WorkState = {
  activeCategory: 'All',
  searchQuery: '',
  selectedProjectSlug: null,
  viewMode: 'grid',
};

export const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {
    setWorkCategory: (state, action: PayloadAction<WorkCategory>) => {
      state.activeCategory = action.payload;
    },
    setWorkSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    selectProject: (state, action: PayloadAction<string | null>) => {
      state.selectedProjectSlug = action.payload;
    },
    setViewMode: (state, action: PayloadAction<WorkState['viewMode']>) => {
      state.viewMode = action.payload;
    },
    resetWorkFilters: (state) => {
      state.activeCategory = 'All';
      state.searchQuery = '';
    },
  },
});

export const {
  setWorkCategory,
  setWorkSearchQuery,
  selectProject,
  setViewMode,
  resetWorkFilters,
} = workSlice.actions;

// Selectors
export const selectActiveWorkCategory = (state: RootState) => state.work.activeCategory;
export const selectWorkSearchQuery = (state: RootState) => state.work.searchQuery;
export const selectSelectedProjectSlug = (state: RootState) => state.work.selectedProjectSlug;

export default workSlice.reducer;
```

---

#### D. Blog Discovery & Reading Slice (`lib/redux/slices/blogSlice.ts`)
Handles real-time instant search across 50+ blog articles, category tag filtering, user reading bookmarks, and estimated scroll completion tracking.

```typescript
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type BlogCategoryFilter = 
  | 'All' 
  | 'AI & Automation' 
  | 'Web Engineering' 
  | 'Branding & Design' 
  | 'SEO & Growth' 
  | 'Next.js';

interface BlogState {
  searchQuery: string;
  selectedCategory: BlogCategoryFilter;
  selectedTag: string | null;
  sortBy: 'latest' | 'popular' | 'readingTime';
  bookmarkedSlugs: string[];
  readingProgress: Record<string, number>; // slug -> percentage (0-100)
}

const initialState: BlogState = {
  searchQuery: '',
  selectedCategory: 'All',
  selectedTag: null,
  sortBy: 'latest',
  bookmarkedSlugs: [],
  readingProgress: {},
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setBlogCategory: (state, action: PayloadAction<BlogCategoryFilter>) => {
      state.selectedCategory = action.payload;
    },
    setBlogTag: (state, action: PayloadAction<string | null>) => {
      state.selectedTag = action.payload;
    },
    setBlogSortBy: (state, action: PayloadAction<BlogState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const slug = action.payload;
      const index = state.bookmarkedSlugs.indexOf(slug);
      if (index >= 0) {
        state.bookmarkedSlugs.splice(index, 1);
      } else {
        state.bookmarkedSlugs.push(slug);
      }
    },
    updateReadingProgress: (
      state, 
      action: PayloadAction<{ slug: string; progress: number }>
    ) => {
      state.readingProgress[action.payload.slug] = Math.min(100, Math.max(0, action.payload.progress));
    },
    clearBlogFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'All';
      state.selectedTag = null;
    },
  },
});

export const {
  setBlogSearchQuery,
  setBlogCategory,
  setBlogTag,
  setBlogSortBy,
  toggleBookmark,
  updateReadingProgress,
  clearBlogFilters,
} = blogSlice.actions;

export default blogSlice.reducer;
```

---

#### E. Services Slice (`lib/redux/slices/servicesSlice.ts`)
Manages active service tabs, interactive package comparison grids, and feature drawer states.

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServicesState {
  activeServiceSlug: string;
  activeComparisonTier: 'starter' | 'growth' | 'enterprise';
  expandedFaqIndex: number | null;
  selectedAddons: string[];
}

const initialState: ServicesState = {
  activeServiceSlug: 'websites',
  activeComparisonTier: 'growth',
  expandedFaqIndex: null,
  selectedAddons: [],
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setActiveServiceSlug: (state, action: PayloadAction<string>) => {
      state.activeServiceSlug = action.payload;
    },
    setActiveTier: (state, action: PayloadAction<ServicesState['activeComparisonTier']>) => {
      state.activeComparisonTier = action.payload;
    },
    setExpandedFaq: (state, action: PayloadAction<number | null>) => {
      state.expandedFaqIndex = action.payload;
    },
    toggleAddon: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.selectedAddons.indexOf(id);
      if (index >= 0) {
        state.selectedAddons.splice(index, 1);
      } else {
        state.selectedAddons.push(id);
      }
    },
  },
});

export const {
  setActiveServiceSlug,
  setActiveTier,
  setExpandedFaq,
  toggleAddon,
} = servicesSlice.actions;

export default servicesSlice.reducer;
```

---

#### F. Preferences & System Slice (`lib/redux/slices/preferencesSlice.ts`)
Handles visitor accessibility preferences, reduced motion compliance, ambient audio volume, and cookie banner consent.

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  reducedMotion: boolean;
  ambientSoundEnabled: boolean;
  ambientVolume: number; // 0.0 to 1.0
  hasAcceptedCookies: boolean;
  themePreference: 'warm-editorial' | 'high-contrast-dark';
}

const initialState: PreferencesState = {
  reducedMotion: false,
  ambientSoundEnabled: false,
  ambientVolume: 0.25,
  hasAcceptedCookies: false,
  themePreference: 'warm-editorial',
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.reducedMotion = action.payload;
    },
    setAmbientSound: (state, action: PayloadAction<boolean>) => {
      state.ambientSoundEnabled = action.payload;
    },
    setAmbientVolume: (state, action: PayloadAction<number>) => {
      state.ambientVolume = Math.min(1, Math.max(0, action.payload));
    },
    acceptCookies: (state) => {
      state.hasAcceptedCookies = true;
    },
    setThemePreference: (state, action: PayloadAction<PreferencesState['themePreference']>) => {
      state.themePreference = action.payload;
    },
  },
});

export const {
  setReducedMotion,
  setAmbientSound,
  setAmbientVolume,
  acceptCookies,
  setThemePreference,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
```

---

### 4.5 Persistence & Analytics Middleware

#### LocalStorage Persistence Middleware (`lib/redux/middleware/persistence.ts`)
Safely saves bookmarked blogs, consultation drafts, and cookie consent to `localStorage` on the client only.

```typescript
import { Middleware } from '@reduxjs/toolkit';

const STORAGE_KEY = 'lls_user_state_v1';

export const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof window !== 'undefined') {
    try {
      const state = store.getState();
      const persistableData = {
        bookmarks: state.blog.bookmarkedSlugs,
        leadDraft: state.leadEstimate.formData,
        cookiesAccepted: state.preferences.hasAcceptedCookies,
        soundEnabled: state.preferences.ambientSoundEnabled,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistableData));
    } catch {
      // Ignore quota / private mode storage errors
    }
  }

  return result;
};
```

#### Custom Analytics Telemetry Middleware (`lib/redux/middleware/analytics.ts`)
Transmits high-intent micro-interactions (e.g., service selection, quote calculation, case study opens) to analytics sinks.

```typescript
import { Middleware } from '@reduxjs/toolkit';

export const analyticsMiddleware: Middleware = () => (next) => (action: any) => {
  const result = next(action);

  if (typeof window !== 'undefined' && action.type) {
    // Intercept conversion events
    if (action.type.startsWith('leadEstimate/toggleService')) {
      window.dispatchEvent(
        new CustomEvent('lls_analytics', {
          detail: { event: 'service_toggled', service: action.payload },
        })
      );
    } else if (action.type === 'ui/openModal') {
      window.dispatchEvent(
        new CustomEvent('lls_analytics', {
          detail: { event: 'modal_opened', modal: action.payload.modal },
        })
      );
    }
  }

  return result;
};
```

---

## 5. Integrating the Redux Provider with Next.js 16 (`app/layout.tsx`)

Wrap the application body with `StoreProvider` in `app/layout.tsx`. Because `StoreProvider` is a Client Component, it acts as a context provider without converting `app/layout.tsx` into a client component.

```tsx
// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import StoreProvider from "@/lib/redux/provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-background overflow-x-hidden">
        <StoreProvider>
          {children}
        </StoreProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 6. Real-World Component Migration & Consumption Examples

### Example 1: Connecting the Navbar (`components/redesign/Navbar.tsx`)

Replace local `useState` for mobile navigation and scroll states with Redux:

```tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setIsScrolled, toggleMobileMenu, openModal } from "@/lib/redux/slices/uiSlice";

export const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isScrolled = useAppSelector((state) => state.ui.isScrolled);
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setIsScrolled(window.scrollY > 40));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center sm:px-4 pointer-events-none">
      <motion.nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-[1100px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full py-4 px-5 md:px-8 origin-top ${
          isScrolled
            ? "bg-background/20 backdrop-blur-[16px] md:backdrop-blur-[40px] backdrop-saturate-[2.5] border border-foreground/10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]"
            : "bg-background/10 backdrop-blur-md border border-foreground/5 shadow-sm"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center sm:gap-3">
          <Image
            src="/logo.png"
            alt="Launch Live Studio"
            width={40}
            height={40}
            className="group-hover:scale-110 transition-transform duration-500"
          />
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            launchlive.studio
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2 text-sm font-semibold tracking-wide transition-colors relative group rounded-full ${
                  isActive ? "bg-foreground/10 text-foreground" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(openModal({ modal: 'calScheduler' }))}
            className="hidden md:flex px-6 py-2.5 bg-accent text-white text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 items-center gap-2"
          >
            <span>Book a Call</span>
          </button>

          <button
            className="md:hidden p-2 text-foreground/80 hover:text-foreground bg-foreground/5 rounded-full"
            onClick={() => dispatch(toggleMobileMenu())}
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>
    </div>
  );
};
```

---

### Example 2: Interactive Cost Estimator & Lead Form (`components/redesign/ProjectEstimator.tsx`)

```tsx
"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { 
  toggleService, 
  updateFormField, 
  submitLeadInquiry 
} from "@/lib/redux/slices/leadEstimateSlice";

const AVAILABLE_SERVICES = [
  { id: "websites", label: "Custom Website Development", desc: "Next.js, High-Speed Performance, Core Web Vitals" },
  { id: "automation", label: "AI & Workflow Automation", desc: "LLM Agents, CRM integrations, Custom Workflows" },
  { id: "branding", label: "Brand Identity & Art Direction", desc: "Logos, Typography, Design Systems, 3D Assets" },
  { id: "ecommerce", label: "Shopify / Custom Storefront", desc: "Liquid animations, headless e-commerce, checkout opt" },
];

export function ProjectEstimator() {
  const dispatch = useAppDispatch();
  const { formData, estimatedTotal, status, errorMessage } = useAppSelector(
    (state) => state.leadEstimate
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitLeadInquiry(formData));
  };

  return (
    <div className="bg-surface border border-foreground/10 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-8 border-b border-foreground/10 pb-6">
        <div>
          <h2 className="text-3xl font-serif font-bold">Interactive Project Builder</h2>
          <p className="text-sm text-text-muted mt-1">Select your stack to calculate estimated investment</p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase font-bold tracking-widest text-text-muted">Estimated Starting At</span>
          <div className="text-3xl font-serif font-bold text-accent">${estimatedTotal.toLocaleString()}</div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">Select Services</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {AVAILABLE_SERVICES.map((srv) => {
            const isSelected = formData.selectedServices.includes(srv.id);
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => dispatch(toggleService(srv.id))}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? "border-accent bg-accent/5 shadow-md shadow-accent/10"
                    : "border-foreground/10 bg-background hover:border-foreground/20"
                }`}
              >
                <div className="font-bold text-sm">{srv.label}</div>
                <div className="text-xs text-text-muted mt-1">{srv.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => dispatch(updateFormField({ field: 'name', value: e.target.value }))}
              placeholder="Jane Doe"
              className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Your Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => dispatch(updateFormField({ field: 'email', value: e.target.value }))}
              placeholder="jane@company.com"
              className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Project Details</label>
          <textarea
            rows={3}
            value={formData.projectDetails}
            onChange={(e) => dispatch(updateFormField({ field: 'projectDetails', value: e.target.value }))}
            placeholder="Tell us about your timeline, targets, and vision..."
            className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:border-accent outline-none resize-none"
          />
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-500/10 text-red-500 text-sm rounded-xl">{errorMessage}</div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-accent text-white font-bold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-accent/25 disabled:opacity-50"
        >
          {status === 'loading' ? 'Submitting Scope...' : status === 'succeeded' ? 'Inquiry Sent!' : 'Request Formal Proposal →'}
        </button>
      </form>
    </div>
  );
}
```

---

### Example 3: Filterable Portfolio with Memoized Selectors (`components/redesign/OurWorkConnected.tsx`)

```tsx
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setWorkCategory, setWorkSearchQuery, WorkCategory } from "@/lib/redux/slices/workSlice";
import { featuredWork } from "./OurWork";

const CATEGORIES: WorkCategory[] = [
  "All",
  "AI / ML",
  "B2B / Trust & Safety",
  "DTC / E-commerce",
  "Shopify / Streetwear",
  "BIM Designing",
  "Tensile and Fabrications",
  "Event and Tent Rentals",
];

export function OurWorkConnected() {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.work.activeCategory);
  const searchQuery = useAppSelector((state) => state.work.searchQuery);

  const filteredProjects = useMemo(() => {
    return featuredWork.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-20 max-w-[1280px] mx-auto px-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => dispatch(setWorkCategory(cat))}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${
              activeCategory === cat
                ? "bg-foreground text-background shadow-md"
                : "bg-surface text-text-muted hover:text-foreground border border-foreground/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.slug}
            className="group bg-surface rounded-3xl p-6 border border-foreground/5 hover:border-accent transition-all duration-500 shadow-sm hover:shadow-2xl"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-foreground/5">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent">{project.category}</span>
                <h3 className="text-2xl font-serif font-bold mt-1">{project.name}</h3>
                <p className="text-sm text-text-muted mt-2">{project.desc}</p>
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-background border border-foreground/10 hover:border-accent group-hover:bg-accent group-hover:text-white transition-colors"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 7. Next.js 16 & React 19 Best Practices Checklist

| Rule | Rationale / Fix |
| :--- | :--- |
| **Never export singleton store directly** | In SSR/Node, a singleton leaks state across incoming user requests. Always use `makeStore()` and `useRef`. |
| **Do not access Redux in Server Components** | Server Components cannot use React Context. Fetch static data on server, pass via props, or read state only in Client leaves (`'use client'`). |
| **Use granular `useAppSelector` hooks** | Avoid `const state = useAppSelector(s => s)`. Extract only the specific primitive or slice field needed to minimize re-renders. |
| **Normalize heavy nested collections** | Keep relational data (like blog tag filters or bookmarked arrays) as arrays of IDs/slugs for $O(1)$ lookups. |
| **Hydrate Client-only data in `useEffect`** | When loading values from `localStorage`, populate the store inside a client `useEffect` or dedicated hydration action to prevent Next.js hydration warnings. |

---

## 8. Step-by-Step Rollout Checklist

- [ ] **Step 1:** Run `npm install @reduxjs/toolkit react-redux`.
- [ ] **Step 2:** Create `lib/redux/store.ts`, `lib/redux/provider.tsx`, and `lib/redux/hooks.ts`.
- [ ] **Step 3:** Implement individual slices under `lib/redux/slices/`.
- [ ] **Step 4:** Wrap `app/layout.tsx` with `<StoreProvider>`.
- [ ] **Step 5:** Connect interactive components (`Navbar`, `OurWork`, `BookACallClient`, `HomeBlogs`).
- [ ] **Step 6:** Verify zero hydration warnings in `npm run dev` and test build with `npm run build`.

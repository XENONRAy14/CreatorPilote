# Design & UX - CreatorPilot

## Principes de Design

### 1. Simple, Pro, Inspirant
- Interface épurée sans surcharge cognitive
- Esthétique professionnelle qui inspire confiance
- Couleurs énergisantes qui motivent à créer

### 2. Mobile-First
- 70% des créateurs gèrent depuis leur téléphone
- Touch-friendly (boutons > 44px)
- Navigation bottom-bar sur mobile

### 3. IA Visible mais Discrète
- Badge "✨ IA" sur les suggestions
- Animations subtiles pour les insights
- Pas de "robot" intrusif

### 4. Zéro État Vide
- Toujours montrer des exemples ou suggestions
- Onboarding guidé dès la première visite
- Placeholders intelligents

---

## Palette de Couleurs

### Couleurs Principales

```css
/* Brand Colors */
--primary: #6366F1;        /* Indigo - Confiance, tech */
--primary-dark: #4F46E5;
--primary-light: #818CF8;

--secondary: #EC4899;      /* Pink - Créativité, énergie */
--secondary-dark: #DB2777;
--secondary-light: #F472B6;

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-700: #374151;
--gray-900: #111827;

/* Semantic */
--success: #10B981;        /* Vert */
--warning: #F59E0B;        /* Orange */
--error: #EF4444;          /* Rouge */
--info: #3B82F6;           /* Bleu */
```

### Mode Sombre (Défaut)

```css
/* Dark Mode */
--bg-primary: #0F172A;     /* Slate 900 */
--bg-secondary: #1E293B;   /* Slate 800 */
--bg-tertiary: #334155;    /* Slate 700 */

--text-primary: #F1F5F9;   /* Slate 100 */
--text-secondary: #CBD5E1; /* Slate 300 */
--text-tertiary: #94A3B8;  /* Slate 400 */
```

---

## Typographie

### Fonts

```css
/* Headings */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
font-weight: 600-800;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400-500;

/* Code/Numbers */
font-family: 'JetBrains Mono', monospace;
```

### Scale

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

---

## Structure du Dashboard

### Layout Desktop

```
┌─────────────────────────────────────────────────────────┐
│  [Logo] CreatorPilot    🔔 Notifications   [Avatar ▼]  │ Header (64px)
├───────┬─────────────────────────────────────────────────┤
│       │                                                 │
│  🏠   │  ┌─────────────────────────────────────────┐  │
│  📊   │  │  🎯 Santé de votre chaîne : 87/100      │  │
│  💡   │  │  ████████████████████░░░░░░░░░░░░░░░░░ │  │
│  💼   │  │  ✅ Engagement stable  ⚠️ Fréquence ↓   │  │
│  💰   │  └─────────────────────────────────────────┘  │
│  ⚙️   │                                                 │
│       │  ┌──────────────┐  ┌──────────────────────┐  │
│ Side  │  │ 📈 Perfs     │  │ 🤖 Conseils IA       │  │
│ bar   │  │              │  │                      │  │
│ 240px │  │ [Graphique]  │  │ "Vos vidéos < 60s   │  │
│       │  │              │  │  ont 2x plus        │  │
│       │  │ 125K vues    │  │  d'engagement"      │  │
│       │  └──────────────┘  └──────────────────────┘  │
│       │                                                 │
│       │  ┌─────────────────────────────────────────┐  │
│       │  │ 🎬 Vos derniers contenus                │  │
│       │  │ [Card] [Card] [Card] [Card]             │  │
│       │  └─────────────────────────────────────────┘  │
└───────┴─────────────────────────────────────────────────┘
```

### Layout Mobile

```
┌─────────────────────────┐
│ [Logo]  🔔  [Avatar]    │ Header
├─────────────────────────┤
│                         │
│ 🎯 Santé : 87/100       │
│ ████████████░░░░░░░░░░ │
│                         │
│ ┌─────────────────────┐ │
│ │ 📈 125K vues (+12%) │ │
│ │ [Mini graphique]    │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ 🤖 Conseil IA       │ │
│ │ "Publiez à 18h..."  │ │
│ └─────────────────────┘ │
│                         │
│ 🎬 Derniers contenus    │
│ [Card] [Card]           │
│                         │
├─────────────────────────┤
│ [🏠] [📊] [💡] [💼] [⚙️] │ Bottom Nav
└─────────────────────────┘
```

---

## Composants Clés

### 1. Dashboard Card

```tsx
// components/DashboardCard.tsx

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  trend?: number;
  loading?: boolean;
}

export function DashboardCard({ title, icon, value, trend, loading }: DashboardCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-indigo-500 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="text-indigo-400">{icon}</div>
          <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        </div>
        {trend !== undefined && (
          <span className={cn(
            "text-sm font-medium",
            trend > 0 ? "text-green-400" : "text-red-400"
          )}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      
      {loading ? (
        <div className="h-8 bg-slate-700 animate-pulse rounded" />
      ) : (
        <p className="text-3xl font-bold text-slate-100">{value}</p>
      )}
    </div>
  );
}
```

### 2. Score de Santé

```tsx
// components/HealthScore.tsx

export function HealthScore({ score }: { score: number }) {
  const getColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };
  
  const getLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Bon";
    return "À améliorer";
  };
  
  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-xl p-6 border border-indigo-500/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-100">
          🎯 Santé de votre chaîne
        </h2>
        <span className={cn("text-2xl font-bold", getColor(score))}>
          {score}/100
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden mb-3">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
      
      <p className={cn("text-sm font-medium", getColor(score))}>
        {getLabel(score)}
      </p>
    </div>
  );
}
```

### 3. Conseil IA Card

```tsx
// components/AIAdviceCard.tsx

interface AIAdviceCardProps {
  type: 'tip' | 'warning' | 'success';
  message: string;
  action?: string;
}

export function AIAdviceCard({ type, message, action }: AIAdviceCardProps) {
  const config = {
    tip: {
      icon: "💡",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400"
    },
    warning: {
      icon: "⚠️",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      text: "text-orange-400"
    },
    success: {
      icon: "✅",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400"
    }
  };
  
  const { icon, bg, border, text } = config[type];
  
  return (
    <div className={cn("rounded-lg p-4 border", bg, border)}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="text-sm text-slate-200 mb-2">{message}</p>
          {action && (
            <p className={cn("text-xs font-medium", text)}>
              → {action}
            </p>
          )}
        </div>
        <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
          ✨ IA
        </span>
      </div>
    </div>
  );
}
```

### 4. Graphique de Performance

```tsx
// components/PerformanceChart.tsx

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function PerformanceChart({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        📈 Performance (30 jours)
      </h3>
      
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis 
            dataKey="date" 
            stroke="#64748B"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#64748B"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke="#6366F1" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

## Expériences Fluides

### 1. Onboarding Magique (< 2 min)

```tsx
// app/onboarding/page.tsx

const steps = [
  {
    title: "Connectez YouTube",
    description: "Accédez à vos analytics en un clic",
    action: <ConnectYouTubeButton />
  },
  {
    title: "Analyse en cours...",
    description: "Nous récupérons vos données",
    action: <LoadingAnimation />
  },
  {
    title: "Votre dashboard est prêt !",
    description: "Découvrez vos premiers insights IA",
    action: <Button href="/dashboard">Voir mon dashboard</Button>
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-md w-full p-8">
        {/* Progress indicator */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= currentStep ? "bg-indigo-500" : "bg-slate-700"
              )}
            />
          ))}
        </div>
        
        {/* Current step */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">
            {steps[currentStep].title}
          </h1>
          <p className="text-slate-400 mb-8">
            {steps[currentStep].description}
          </p>
          {steps[currentStep].action}
        </div>
      </div>
    </div>
  );
}
```

### 2. Génération d'Idées en Temps Réel

```tsx
// components/IdeaGenerator.tsx

export function IdeaGenerator() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateIdeas = async () => {
    setIsGenerating(true);
    setIdeas([]);
    
    const response = await fetch('/api/ai/generate-ideas', {
      method: 'POST',
      body: JSON.stringify({ platform: 'youtube', niche: userNiche })
    });
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          setIdeas(prev => [...prev, data.idea]);
        }
      }
    }
    
    setIsGenerating(false);
  };
  
  return (
    <div>
      <Button onClick={generateIdeas} disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin mr-2" />
            Génération en cours...
          </>
        ) : (
          <>
            ✨ Générer 10 idées
          </>
        )}
      </Button>
      
      {/* Ideas list with stagger animation */}
      <div className="mt-6 space-y-3">
        {ideas.map((idea, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <IdeaCard idea={idea} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Facturation en 30 Secondes

```tsx
// components/QuickInvoice.tsx

export function QuickInvoice() {
  const [step, setStep] = useState<'form' | 'preview' | 'sent'>('form');
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Nouveau partenariat</Button>
      </DialogTrigger>
      
      <DialogContent>
        {step === 'form' && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Nouveau partenariat</h2>
            
            <Input label="Nom de la marque" required />
            <Input label="Montant (€)" type="number" required />
            <Select label="Type" options={partnershipTypes} />
            <DatePicker label="Date de livraison" />
            
            <Button type="submit" className="w-full mt-4">
              Générer la facture
            </Button>
          </form>
        )}
        
        {step === 'preview' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Aperçu de la facture</h2>
            <InvoicePreview data={formData} />
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setStep('form')}>
                Modifier
              </Button>
              <Button onClick={sendInvoice} className="flex-1">
                Envoyer par email
              </Button>
            </div>
          </div>
        )}
        
        {step === 'sent' && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-xl font-bold mb-2">Facture envoyée !</h2>
            <p className="text-slate-400">
              Un email a été envoyé à la marque avec la facture en pièce jointe.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

---

## Animations & Micro-interactions

### Transitions

```css
/* Smooth transitions */
.transition-smooth {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Loading skeleton */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #1E293B 0%,
    #334155 50%,
    #1E293B 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

### Framer Motion Variants

```tsx
// lib/animations.ts

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};
```

---

## Responsive Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Adaptation Mobile

```tsx
// Exemple d'adaptation
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4
">
  {/* Cards */}
</div>

<nav className="
  fixed 
  bottom-0 
  left-0 
  right-0 
  lg:static 
  lg:w-64
">
  {/* Navigation */}
</nav>
```

---

## Accessibilité (A11y)

### Checklist

- [ ] Contraste minimum 4.5:1 (WCAG AA)
- [ ] Navigation au clavier (Tab, Enter, Esc)
- [ ] ARIA labels sur les boutons icônes
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Textes alternatifs sur les images
- [ ] Taille de police minimum 16px
- [ ] Zones de clic minimum 44x44px (mobile)

### Exemple

```tsx
<button
  aria-label="Générer des idées de contenu"
  className="focus:ring-2 focus:ring-indigo-500 focus:outline-none"
>
  <Sparkles className="w-5 h-5" />
</button>
```

---

## Design System (Figma)

### Structure recommandée

```
📁 CreatorPilot Design System
├── 🎨 Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Icons
├── 🧩 Components
│   ├── Buttons
│   ├── Cards
│   ├── Forms
│   ├── Modals
│   └── Charts
├── 📱 Screens
│   ├── Dashboard
│   ├── Analytics
│   ├── Ideas Generator
│   ├── Partnerships
│   └── Settings
└── 🎬 Prototypes
    ├── Onboarding Flow
    ├── Idea Generation
    └── Invoice Creation
```

---

## Conclusion

Le design de CreatorPilot doit être :
- **Immédiatement compréhensible** : Pas de courbe d'apprentissage
- **Visuellement motivant** : Couleurs énergisantes, animations fluides
- **Mobile-optimisé** : 70% des users sont sur mobile
- **IA subtile** : Présente mais pas intrusive
- **Performance** : Chargement < 2s, interactions < 100ms

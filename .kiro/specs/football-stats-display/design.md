# Design Document

## Overview

The football stats display application will be built as a modern, responsive web application using Next.js 15 with React 19 and Tailwind CSS. The application will present football players from different teams with their match-by-match statistics and performance metrics, allowing users to analyze player performance across different games and opponents.

The design follows a clean, sports-focused aesthetic with emphasis on data readability and detailed match analysis. The application will use a card-based layout for player listings and a comprehensive match-based statistics view for individual player performance tracking. The core focus is on match-by-match data organization rather than just aggregated statistics.

## Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 for responsive design
- **State Management**: React hooks (useState, useEffect) for local state
- **Data Fetching**: Next.js built-in data fetching with static generation where possible

### Application Structure
```
src/
├── app/
│   ├── layout.tsx (root layout)
│   ├── page.tsx (main player listing)
│   ├── player/
│   │   └── [id]/
│   │       └── page.tsx (individual player details)
│   └── globals.css
├── components/
│   ├── PlayerCard.tsx
│   ├── PlayerDetail.tsx
│   ├── SearchBar.tsx
│   ├── FilterControls.tsx
│   └── TeamBadge.tsx
├── types/
│   └── player.ts
├── data/
│   └── players.ts (mock data)
└── utils/
    └── formatters.ts
```

## Components and Interfaces

### Core Data Types

```typescript
interface Player {
  id: string;
  name: string;
  team: Team;
  position: Position;
  matches: Match[];
  aggregatedStats: AggregatedStats;
  photo?: string;
}

interface Team {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
  shortName: string;
  logo?: string;
}

interface Match {
  id: string;
  date: string;
  opponent: Team;
  isHome: boolean;
  matchResult: 'win' | 'loss' | 'draw';
  finalScore: {
    home: number;
    away: number;
  };
  playerStats: MatchPlayerStats;
  events: MatchEvent[];
}

interface MatchPlayerStats {
  minutesPlayed: number;
  goals: number;
  assists: number;
  passesCompleted: number;
  totalPasses: number;
  shotsTaken: number;
  tacklesMade: number;
  yellowCards: number;
  redCards: number;
}

interface MatchEvent {
  type: 'goal' | 'assist' | 'yellow_card' | 'red_card' | 'substitution';
  minute: number;
  description: string;
}

interface AggregatedStats {
  totalMatches: number;
  totalGoals: number;
  totalAssists: number;
  totalMinutes: number;
  recentFormAverage: {
    goals: number;
    assists: number;
    passAccuracy: number;
  };
}

type Position = 'GK' | 'DEF' | 'MID' | 'FWD';
```

### Component Specifications

#### PlayerCard Component
- **Purpose**: Display player summary in grid layout
- **Props**: Player object, onClick handler
- **Features**: 
  - Player photo with fallback
  - Team badge with colors
  - Key stats preview (goals, assists, games)
  - Recent form average from last 5 matches
  - Hover effects and click interaction

#### PlayerDetail Component
- **Purpose**: Full player statistics display organized by matches
- **Props**: Player object
- **Features**:
  - Match-by-match statistics table with chronological ordering
  - Aggregated totals at the top (total goals, assists, matches)
  - Match context (opponent, date, home/away, result, final score)
  - Match events timeline (goals, cards, substitutions with timestamps)
  - Filter by opponent team functionality
  - Performance comparison between matches
  - "No match data available" state handling
  - Responsive layout for mobile

#### SearchBar Component
- **Purpose**: Real-time player name filtering
- **Props**: onSearch callback, placeholder text
- **Features**:
  - Debounced search input
  - Clear button functionality
  - Responsive design

#### FilterControls Component
- **Purpose**: Team and position filtering
- **Props**: Available teams/positions, filter callbacks
- **Features**:
  - Dropdown selectors for team and position
  - Clear filters functionality
  - Active filter indicators

#### TeamBadge Component
- **Purpose**: Display team branding consistently
- **Props**: Team object, size variant
- **Features**:
  - Team colors as background
  - Team name display
  - Optional logo support

## Data Models

### Player Data Structure
The application will use a centralized data structure containing all players with their associated team and statistical information. Initially, this will be mock data stored in a TypeScript file, but the structure is designed to easily integrate with external APIs.

### Sample Data Format
```typescript
const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Lionel Messi",
    team: {
      id: "psg",
      name: "Paris Saint-Germain",
      colors: { primary: "#004170", secondary: "#ED1C24" },
      shortName: "PSG"
    },
    position: "FWD",
    matches: [
      {
        id: "match1",
        date: "2024-01-15",
        opponent: {
          id: "barcelona",
          name: "FC Barcelona",
          colors: { primary: "#A50044", secondary: "#004D98" },
          shortName: "BAR"
        },
        isHome: true,
        matchResult: "win",
        finalScore: { home: 2, away: 1 },
        playerStats: {
          minutesPlayed: 90,
          goals: 1,
          assists: 1,
          passesCompleted: 45,
          totalPasses: 52,
          shotsTaken: 4,
          tacklesMade: 2,
          yellowCards: 0,
          redCards: 0
        },
        events: [
          { type: "goal", minute: 23, description: "Right foot shot from center of box" },
          { type: "assist", minute: 67, description: "Through ball to teammate" }
        ]
      }
    ],
    aggregatedStats: {
      totalMatches: 32,
      totalGoals: 16,
      totalAssists: 16,
      totalMinutes: 2640,
      recentFormAverage: {
        goals: 0.6,
        assists: 0.4,
        passAccuracy: 86.5
      }
    }
  }
  // ... more players
];
```

## User Interface Design

### Layout Structure
- **Header**: Application title and navigation
- **Search Section**: Search bar and filter controls
- **Main Content**: Grid layout of player cards
- **Player Detail**: Modal or separate page for detailed stats

### Responsive Design
- **Desktop**: 4-column grid for player cards
- **Tablet**: 2-column grid with adjusted spacing
- **Mobile**: Single column with full-width cards

### Color Scheme
- **Primary**: Clean whites and grays for readability
- **Accent**: Team colors for branding elements
- **Text**: High contrast for accessibility
- **Interactive**: Subtle hover states and transitions

### Typography
- **Headers**: Bold, clear fonts for player names and stats
- **Body**: Readable font sizes with proper line spacing
- **Numbers**: Monospace font for statistical data alignment

## Error Handling

### Data Loading States
- Loading spinners during data fetch
- Skeleton components for better perceived performance
- Error boundaries for component failures

### Search and Filter States
- "No results found" messaging
- Clear indication when filters are active
- Graceful handling of empty data sets

### Image Loading
- Placeholder images for missing player photos
- Fallback team logos or colored badges
- Progressive image loading for better performance

## Testing Strategy

### Unit Testing
- Component rendering tests
- Data transformation utility tests
- Search and filter logic tests
- Mock data validation tests

### Integration Testing
- Player card click navigation
- Search functionality across components
- Filter combinations and clearing
- Responsive layout behavior

### User Experience Testing
- Performance testing with large datasets
- Accessibility compliance testing
- Cross-browser compatibility
- Mobile device testing

### Test Data
- Comprehensive mock dataset with various player types
- Edge cases: players with no stats, missing photos
- Different team configurations and positions
- Performance testing with 100+ players

## Performance Considerations

### Optimization Strategies
- Static generation for player data where possible
- Image optimization using Next.js Image component
- Lazy loading for player detail views
- Debounced search to reduce re-renders

### Scalability
- Virtualized lists for large player datasets
- Pagination or infinite scroll for extensive rosters
- Efficient filtering algorithms
- Memoization of expensive calculations

The design prioritizes user experience with fast loading times, intuitive navigation, and clear data presentation while maintaining the flexibility to scale with additional features and larger datasets.
# API Mocking System

This Quasar application includes a comprehensive API mocking system for development and testing.

## Setup

1. Install the required dependency:
```bash
yarn add -D axios-mock-adapter
```

2. Enable the mock boot file in your `quasar.config.ts`:
```typescript
boot: [
  'axios',
  'mock-api', // Add this line
  // ... other boot files
]
```

## Usage

### Enabling Mocks

Mocks are automatically enabled in development mode. You can also force enable them by setting:
```bash
ENABLE_API_MOCKS=true
```

### Mock Scenarios

The system supports different scenarios for testing various states:

#### Available Scenarios:

- **default**: Standard mock responses with successful operations
- **unauthorized**: Simulates unauthenticated user state
- **networkError**: Forces network errors for error handling testing
- **slowResponse**: Simulates slow API responses (2s delay)
- **validationErrors**: Returns form validation errors
- **emptyData**: Returns empty datasets

### Changing Scenarios

#### In Browser Console:
```javascript
// View available scenarios
mockControls.availableScenarios

// Get current scenario
mockControls.getCurrentScenario()

// Change scenario
mockControls.setScenario('unauthorized')

// View scenario details
mockControls.scenarioInfo
```

#### Via Environment Variable:
```bash
MOCK_SCENARIO=unauthorized yarn dev
```

### Browser Developer Tools

Open your browser's developer console and use the global `mockControls` object:

```javascript
// List all available scenarios
console.log(mockControls.availableScenarios);

// Switch to unauthorized scenario
mockControls.setScenario('unauthorized');

// Switch back to default
mockControls.setScenario('default');
```

## Mock Data Structure

The system mocks your existing API patterns:
- POST requests to base URL with `path` parameter
- Supports all your current endpoints: `auth`, `locationSearch`, `ordersList`, etc.
- Maintains the same response structure as your real API

## Customizing Mock Data

### Adding New Endpoints

Edit `src/boot/mock-api.ts` and add your endpoint logic:

```typescript
if (path === 'newEndpoint') {
  return [200, { data: 'your mock response' }];
}
```

### Creating New Scenarios

Edit `src/boot/mock-config.ts` and add to `mockScenarios`:

```typescript
myScenario: {
  name: 'My Custom Scenario',
  description: 'Description of what this tests',
  overrides: {
    'auth.standalone-state': {
      isAuthorized: false
    }
  }
}
```

## Testing Different States

### Authentication Testing
```javascript
// Test logged out state
mockControls.setScenario('unauthorized');

// Test normal logged in state
mockControls.setScenario('default');
```

### Error Handling Testing
```javascript
// Test network errors
mockControls.setScenario('networkError');

// Test form validation errors
mockControls.setScenario('validationErrors');
```

### Performance Testing
```javascript
// Test slow responses
mockControls.setScenario('slowResponse');
```

### Empty State Testing
```javascript
// Test empty data responses
mockControls.setScenario('emptyData');
```

## Console Logging

Mock API calls are logged to the console with the 🔧 emoji:
- `🔧 API Mocks enabled with scenario: default`
- `🔧 Mock API call: auth (standalone-state)`
- `🔧 Mock scenario changed to: unauthorized`

## Disabling Mocks

Mocks are automatically disabled in production. To disable in development:

```bash
ENABLE_API_MOCKS=false yarn dev
```

## Integration with Your Existing Code

The mocking system works seamlessly with your existing:
- `Api.vue` component
- `post()` and `postSimple()` methods
- Axios interceptors
- All existing API calls throughout your application

No changes to your existing code are required!

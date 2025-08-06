export interface MockScenario {
  name: string;
  description: string;
  overrides: Record<string, any>;
}

export const mockScenarios: Record<string, MockScenario> = {
  default: {
    name: 'Default',
    description: 'Standard mock responses',
    overrides: {}
  },

  unauthorized: {
    name: 'Unauthorized User',
    description: 'User is not logged in',
    overrides: {
      'auth.standalone-state': {
        isAuthorized: false,
        login: null,
        userId: null,
        token: null
      },
      'profile.standalone-state': {
        isAuthorized: false
      },
      'ordersList': {
        isAuthorized: false
      }
    }
  },

  networkError: {
    name: 'Network Errors',
    description: 'Simulate network failures',
    overrides: {
      _forceError: true,
      _errorType: 'network'
    }
  },

  slowResponse: {
    name: 'Slow Response',
    description: 'Simulate slow API responses',
    overrides: {
      _delay: 2000
    }
  },

  validationErrors: {
    name: 'Validation Errors',
    description: 'Simulate form validation errors',
    overrides: {
      'auth.login': {
        isSuccess: false,
        isAuthorized: false,
        fieldErrors: {
          email: ['Invalid email format'],
          password: ['Password is required']
        },
        errors: ['Login failed. Please check your credentials.']
      },
      'profile.save': {
        isSuccess: false,
        fieldErrors: {
          email: ['Email already exists'],
          phone: ['Invalid phone number format']
        },
        errors: ['Please fix the errors below']
      }
    }
  },

  emptyData: {
    name: 'Empty Data',
    description: 'Simulate empty responses',
    overrides: {
      'ordersList': {
        isAuthorized: true,
        orders: []
      },
      'orderRelatedAdverts': {
        adverts: [],
        meta: { total: 0, page: 1 }
      },
      'locationSearch': {
        results: []
      }
    }
  }
};

// Get current scenario from localStorage or environment
export function getCurrentScenario(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('mockScenario') || 'default';
  }
  return process.env.MOCK_SCENARIO || 'default';
}

// Set mock scenario
export function setMockScenario(scenario: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockScenario', scenario);
    console.log(`🔧 Mock scenario changed to: ${scenario}`);
  }
}

// Apply scenario overrides to mock data
export function applyScenarioOverrides(baseData: any, scenario: string): any {
  const scenarioConfig = mockScenarios[scenario];
  if (!scenarioConfig) {
    return baseData;
  }

  const result = JSON.parse(JSON.stringify(baseData)); // Deep clone

  for (const [path, override] of Object.entries(scenarioConfig.overrides)) {
    if (path.startsWith('_')) continue; // Skip meta properties

    const pathParts = path.split('.');
    let current = result;

    // Navigate to the correct nested object
    for (let i = 0; i < pathParts.length - 1; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = {};
      }
      current = current[pathParts[i]];
    }

    // Apply the override
    const finalKey = pathParts[pathParts.length - 1];
    current[finalKey] = { ...current[finalKey], ...override };
  }

  return result;
}

// Expose mock controls to window for debugging
if (typeof window !== 'undefined') {
  (window as any).mockControls = {
    setScenario: setMockScenario,
    getCurrentScenario,
    availableScenarios: Object.keys(mockScenarios),
    scenarioInfo: mockScenarios
  };
}

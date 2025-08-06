import { defineBoot } from '#q-app/wrappers';
import MockAdapter from 'axios-mock-adapter';
import { api as axios } from 'boot/axios';
import { getCurrentScenario, applyScenarioOverrides, mockScenarios } from './mock-config';

// Base mock data
const baseMockData = {
  auth: {
    'standalone-state': {
      isAuthorized: true,
      login: 'test@example.com',
      userId: 123,
      token: 'mock-token-123',
    },
    login: {
      isSuccess: true,
      isAuthorized: true,
      userId: 123,
      login: 'test@example.com',
      fieldErrors: {},
      errors: [],
    },
    'forgot-password': {
      isSuccess: true,
      fieldErrors: {},
      errors: [],
    },
    'load-soc-serv-services': {
      GoogleOAuth: 'https://mock-google-oauth.com',
      Facebook: 'https://mock-facebook.com',
    },
  },
  locationSearch: {
    results: [
      { id: 1, name: 'Kyiv, Ukraine', lat: 50.4501, lng: 30.5234 },
      { id: 2, name: 'Lviv, Ukraine', lat: 49.8397, lng: 24.0297 },
      { id: 3, name: 'Odesa, Ukraine', lat: 46.4825, lng: 30.7233 },
    ],
  },
  ordersList: {
    isAuthorized: true,
    orders: [
      {
        id: 1,
        accountNumber: 'ORD-001',
        status: { code: 'P', name: 'Pending' },
        createdAt: '2024-01-15',
        amount: 1500,
      },
      {
        id: 2,
        accountNumber: 'ORD-002',
        status: { code: 'F', name: 'Finished' },
        createdAt: '2024-01-10',
        amount: 2000,
      },
    ],
  },
  orderDetail: {
    isAuthorized: true,
    order: {
      id: 1,
      accountNumber: 'ORD-001',
      status: { code: 'P', name: 'Pending' },
      createdAt: '2024-01-15',
      amount: 1500,
    },
    estimation: {
      price: 1500,
      confidence: 85,
    },
    summary: {
      totalArea: 120,
      rooms: 3,
      bathrooms: 2,
    },
  },
  profile: {
    isAuthorized: true,
    isSuccess: true,
    emailConfirmed: true,
    userId: 123,
    login: 'test@example.com',
    fieldErrors: {},
    errors: [],
    inputs: {
      name: 'John',
      lastName: 'Doe',
      phone: '+380123456789',
      email: 'test@example.com',
    },
  },
  checkout: {
    success: true,
    message: 'Data saved successfully',
  },
  payment: {
    isAuthorized: true,
    paymentUrl: 'https://mock-payment.com/pay',
    formData: {
      merchantAccount: 'test_merchant',
      orderReference: 'ORD-001',
      amount: 1500,
      currency: 'UAH',
    },
  },
  orderReview: {
    hasReview: false,
    reviewSaved: true,
  },
  orderRelatedAdverts: {
    adverts: [
      {
        id: 1,
        title: 'Similar Property 1',
        price: 1400,
        area: 115,
        location: 'Kyiv',
      },
      {
        id: 2,
        title: 'Similar Property 2',
        price: 1600,
        area: 125,
        location: 'Kyiv',
      },
    ],
    meta: {
      total: 2,
      page: 1,
    },
  },
};

export default defineBoot(() => {
  // Only enable mocks in development mode or when explicitly enabled
  const enableMocks =
    process.env.NODE_ENV === 'development' || process.env.ENABLE_API_MOCKS === 'true';

  if (!enableMocks) {
    return;
  }

  const currentScenario = getCurrentScenario();
  console.log(`🔧 API Mocks enabled with scenario: ${currentScenario}`);

  // Apply scenario overrides to mock data
  const mockData = applyScenarioOverrides(baseMockData, currentScenario);
  const scenarioConfig = mockScenarios[currentScenario];

  // Create mock adapter with configurable delay
  const delayResponse = scenarioConfig?.overrides._delay || 300;
  const mock = new MockAdapter(axios, { delayResponse });

  // Check if we should force errors
  const forceError = scenarioConfig?.overrides._forceError;
  const errorType = scenarioConfig?.overrides._errorType || 'network';

  mock.onGet('/user').reply(200, {
    users: { id: 1, name: 'John Smith' },
  });

  // Mock the main API endpoint pattern: POST to baseURL with path parameter
  mock.onPost().reply((config) => {
    // Force error scenarios
    if (forceError) {
      if (errorType === 'network') {
        throw new Error('Network Error');
      } else if (errorType === 'timeout') {
        return new Promise(() => {}); // Never resolves (timeout)
      } else {
        return [500, { error: 'Internal Server Error' }];
      }
    }

    const url = new URL(config.url || '', config.baseURL);
    const path = url.searchParams.get('path');

    if (!path) {
      return [400, { error: 'Path parameter is required' }];
    }

    // Parse request data
    let requestData;
    try {
      requestData = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    } catch {
      requestData = {};
    }

    const action = requestData?.action;

    console.log(`🔧 Mock API call: ${path}${action ? ` (${action})` : ''}`, requestData);

    // Handle different paths and actions
    if (path === 'auth') {
      const authAction = action || 'standalone-state';
      if (mockData.auth[authAction]) {
        return [200, mockData.auth[authAction], { 'x-token': 'mock-token-123' }];
      }
    }

    if (path === 'locationSearch') {
      const query = requestData?.query || '';
      const filteredResults = mockData.locationSearch.results.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      return [200, { results: filteredResults }];
    }

    if (path === 'ordersList' && action === 'loadOrdersList') {
      return [200, mockData.ordersList];
    }

    if (path === 'orderDetail' && action === 'loadOrder') {
      return [200, mockData.orderDetail];
    }

    if (path === 'profile') {
      if (action === 'standalone-state') {
        return [200, mockData.profile];
      }
      if (action === 'save') {
        return [
          200,
          { ...mockData.profile, inputs: { ...mockData.profile.inputs, ...requestData.data } },
        ];
      }
    }

    if (path === 'checkout') {
      if (action === 'saveInputs') {
        return [200, mockData.checkout];
      }
      if (action === 'file' && requestData.task === 'delete') {
        return [200, { success: true }];
      }
    }

    if (path === 'payment' && action === 'initPayment') {
      return [200, mockData.payment];
    }

    if (path === 'orderReview') {
      if (action === 'isOrderHasReview') {
        return [200, mockData.orderReview];
      }
      if (action === 'saveReview') {
        return [200, { reviewSaved: true }];
      }
    }

    if (path === 'orderRelatedAdverts') {
      return [200, mockData.orderRelatedAdverts];
    }

    // Default fallback
    console.warn(`🔧 No mock data found for path: ${path}, action: ${action}`);
    return [200, { success: true, message: 'Mock response' }];
  });

  // Handle specific error endpoints for testing
  mock.onAny('/api/error').networkError();
  mock.onAny('/api/timeout').timeout();
});

export default () => ({
  mcp: {
    enabled: true,
    config: {
      session: {
        type: 'memory',
      },
      // Allow access from Docker bridge gateway (iopulse VPS uses 10.0.1.1)
      allowedIPs: ['127.0.0.1', '::1', '10.0.1.1'],
    },
  },
});

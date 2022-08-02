export const carbonWallet = {
    // The label that will be displayed in the wallet selection modal
    label: 'Carbon Wallet',
    // The property on the window where the injected provider is defined
    // Example: window.ethereum
    injectedNamespace: 'carbon',
    // A function that returns a bool indicating whether or not the provider is
    // of a certain identity. In this case, a unique property on the provider
    // is used to identify the provider.
    // In most cases this is in the format: `is<provider-name>`.
    // You may also include custom logic here if checking for the property
    // isn't sufficient.
    checkProviderIdentity: ({ provider }) =>
        !!provider && !!provider['isCarbon'],
    // A method that returns a string of the wallet icon which will be displayed
    getIcon: async () => (await import('../../assets/images/carbonwallet-icon.svg')).default,
    // Returns a valid EIP1193 provider. In some cases the provider will need to be patched to satisfy the EIP1193 Provider interface
    getInterface: () => ({
        provider: window.carbon
    }),
    // A list of platforms that this wallet supports
    platforms: ['desktop']
}
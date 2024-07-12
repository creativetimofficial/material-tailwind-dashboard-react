import React, { useEffect } from 'react';

const Configurator = () => {
  useEffect(() => {
    // Watson Assistant Chat Integration
    window.watsonAssistantChatOptions = {
      integrationID: "4060c3c2-9e8a-4283-ab97-8d3bb46e7f3c", // The ID of this integration.
      region: "au-syd", // The region your integration is hosted in.
      serviceInstanceID: "0956106c-035a-483c-b362-42f6be61c7e6", // The ID of your service instance.
      onLoad: async (instance) => { await instance.render(); }
    };

    const script = document.createElement('script');
    script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(script);

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything itself
};

export default Configurator;

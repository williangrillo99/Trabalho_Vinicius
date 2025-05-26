"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tracing.ts
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const sdk = new sdk_node_1.NodeSDK({
    traceExporter: new sdk_trace_base_1.ConsoleSpanExporter(),
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
});
(async () => {
    try {
        await sdk.start();
        console.log('Tracing iniciado');
    }
    catch (err) {
        console.error('Erro no OpenTelemetry', err);
    }
})();

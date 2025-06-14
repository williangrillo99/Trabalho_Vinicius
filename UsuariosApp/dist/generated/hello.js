"use strict";
// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: hello.proto
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreeterClient = exports.GreeterService = exports.HelloReply = exports.HelloRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const wire_1 = require("@bufbuild/protobuf/wire");
const grpc_js_1 = require("@grpc/grpc-js");
exports.protobufPackage = "hello";
function createBaseHelloRequest() {
    return { name: "" };
}
exports.HelloRequest = {
    encode(message, writer = new wire_1.BinaryWriter()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof wire_1.BinaryReader ? input : new wire_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHelloRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { name: isSet(object.name) ? globalThis.String(object.name) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.name !== "") {
            obj.name = message.name;
        }
        return obj;
    },
    create(base) {
        return exports.HelloRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseHelloRequest();
        message.name = object.name ?? "";
        return message;
    },
};
function createBaseHelloReply() {
    return { message: "" };
}
exports.HelloReply = {
    encode(message, writer = new wire_1.BinaryWriter()) {
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof wire_1.BinaryReader ? input : new wire_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHelloReply();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.message = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.message !== "") {
            obj.message = message.message;
        }
        return obj;
    },
    create(base) {
        return exports.HelloReply.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseHelloReply();
        message.message = object.message ?? "";
        return message;
    },
};
exports.GreeterService = {
    sayHello: {
        path: "/hello.Greeter/SayHello",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.HelloRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.HelloRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.HelloReply.encode(value).finish()),
        responseDeserialize: (value) => exports.HelloReply.decode(value),
    },
};
exports.GreeterClient = (0, grpc_js_1.makeGenericClientConstructor)(exports.GreeterService, "hello.Greeter");
function isSet(value) {
    return value !== null && value !== undefined;
}

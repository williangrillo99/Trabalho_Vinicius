// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: usuario.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientOptions,
  type ClientUnaryCall,
  type handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  type ServiceError,
  type UntypedServiceImplementation,
} from "@grpc/grpc-js";

export const protobufPackage = "";

export interface CriarUsuarioRequest {
  nome: string;
  cpfCnpj: string;
  senha: string;
  idClientAssas: string;
}

export interface UsuarioResponse {
  id: number;
  cpfCnpj: string;
  nome: string;
  idClientAssas: string;
}

export interface LoginRequest {
  cpfCnpj: string;
  senha: string;
}

function createBaseCriarUsuarioRequest(): CriarUsuarioRequest {
  return { nome: "", cpfCnpj: "", senha: "", idClientAssas: "" };
}

export const CriarUsuarioRequest: MessageFns<CriarUsuarioRequest> = {
  encode(message: CriarUsuarioRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.nome !== "") {
      writer.uint32(10).string(message.nome);
    }
    if (message.cpfCnpj !== "") {
      writer.uint32(18).string(message.cpfCnpj);
    }
    if (message.senha !== "") {
      writer.uint32(26).string(message.senha);
    }
    if (message.idClientAssas !== "") {
      writer.uint32(34).string(message.idClientAssas);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CriarUsuarioRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCriarUsuarioRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.nome = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.cpfCnpj = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.senha = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.idClientAssas = reader.string();
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

  fromJSON(object: any): CriarUsuarioRequest {
    return {
      nome: isSet(object.nome) ? globalThis.String(object.nome) : "",
      cpfCnpj: isSet(object.cpfCnpj) ? globalThis.String(object.cpfCnpj) : "",
      senha: isSet(object.senha) ? globalThis.String(object.senha) : "",
      idClientAssas: isSet(object.idClientAssas) ? globalThis.String(object.idClientAssas) : "",
    };
  },

  toJSON(message: CriarUsuarioRequest): unknown {
    const obj: any = {};
    if (message.nome !== "") {
      obj.nome = message.nome;
    }
    if (message.cpfCnpj !== "") {
      obj.cpfCnpj = message.cpfCnpj;
    }
    if (message.senha !== "") {
      obj.senha = message.senha;
    }
    if (message.idClientAssas !== "") {
      obj.idClientAssas = message.idClientAssas;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CriarUsuarioRequest>, I>>(base?: I): CriarUsuarioRequest {
    return CriarUsuarioRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CriarUsuarioRequest>, I>>(object: I): CriarUsuarioRequest {
    const message = createBaseCriarUsuarioRequest();
    message.nome = object.nome ?? "";
    message.cpfCnpj = object.cpfCnpj ?? "";
    message.senha = object.senha ?? "";
    message.idClientAssas = object.idClientAssas ?? "";
    return message;
  },
};

function createBaseUsuarioResponse(): UsuarioResponse {
  return { id: 0, cpfCnpj: "", nome: "", idClientAssas: "" };
}

export const UsuarioResponse: MessageFns<UsuarioResponse> = {
  encode(message: UsuarioResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.cpfCnpj !== "") {
      writer.uint32(18).string(message.cpfCnpj);
    }
    if (message.nome !== "") {
      writer.uint32(26).string(message.nome);
    }
    if (message.idClientAssas !== "") {
      writer.uint32(34).string(message.idClientAssas);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UsuarioResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUsuarioResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.cpfCnpj = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.nome = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.idClientAssas = reader.string();
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

  fromJSON(object: any): UsuarioResponse {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      cpfCnpj: isSet(object.cpfCnpj) ? globalThis.String(object.cpfCnpj) : "",
      nome: isSet(object.nome) ? globalThis.String(object.nome) : "",
      idClientAssas: isSet(object.idClientAssas) ? globalThis.String(object.idClientAssas) : "",
    };
  },

  toJSON(message: UsuarioResponse): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.cpfCnpj !== "") {
      obj.cpfCnpj = message.cpfCnpj;
    }
    if (message.nome !== "") {
      obj.nome = message.nome;
    }
    if (message.idClientAssas !== "") {
      obj.idClientAssas = message.idClientAssas;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UsuarioResponse>, I>>(base?: I): UsuarioResponse {
    return UsuarioResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UsuarioResponse>, I>>(object: I): UsuarioResponse {
    const message = createBaseUsuarioResponse();
    message.id = object.id ?? 0;
    message.cpfCnpj = object.cpfCnpj ?? "";
    message.nome = object.nome ?? "";
    message.idClientAssas = object.idClientAssas ?? "";
    return message;
  },
};

function createBaseLoginRequest(): LoginRequest {
  return { cpfCnpj: "", senha: "" };
}

export const LoginRequest: MessageFns<LoginRequest> = {
  encode(message: LoginRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.cpfCnpj !== "") {
      writer.uint32(10).string(message.cpfCnpj);
    }
    if (message.senha !== "") {
      writer.uint32(18).string(message.senha);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.cpfCnpj = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.senha = reader.string();
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

  fromJSON(object: any): LoginRequest {
    return {
      cpfCnpj: isSet(object.cpfCnpj) ? globalThis.String(object.cpfCnpj) : "",
      senha: isSet(object.senha) ? globalThis.String(object.senha) : "",
    };
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    if (message.cpfCnpj !== "") {
      obj.cpfCnpj = message.cpfCnpj;
    }
    if (message.senha !== "") {
      obj.senha = message.senha;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginRequest>, I>>(base?: I): LoginRequest {
    return LoginRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginRequest>, I>>(object: I): LoginRequest {
    const message = createBaseLoginRequest();
    message.cpfCnpj = object.cpfCnpj ?? "";
    message.senha = object.senha ?? "";
    return message;
  },
};

export type UsuarioService = typeof UsuarioService;
export const UsuarioService = {
  adicionar: {
    path: "/Usuario/Adicionar",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CriarUsuarioRequest) => Buffer.from(CriarUsuarioRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CriarUsuarioRequest.decode(value),
    responseSerialize: (value: UsuarioResponse) => Buffer.from(UsuarioResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UsuarioResponse.decode(value),
  },
  login: {
    path: "/Usuario/Login",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LoginRequest) => Buffer.from(LoginRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LoginRequest.decode(value),
    responseSerialize: (value: UsuarioResponse) => Buffer.from(UsuarioResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UsuarioResponse.decode(value),
  },
} as const;

export interface UsuarioServer extends UntypedServiceImplementation {
  adicionar: handleUnaryCall<CriarUsuarioRequest, UsuarioResponse>;
  login: handleUnaryCall<LoginRequest, UsuarioResponse>;
}

export interface UsuarioClient extends Client {
  adicionar(
    request: CriarUsuarioRequest,
    callback: (error: ServiceError | null, response: UsuarioResponse) => void,
  ): ClientUnaryCall;
  adicionar(
    request: CriarUsuarioRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UsuarioResponse) => void,
  ): ClientUnaryCall;
  adicionar(
    request: CriarUsuarioRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UsuarioResponse) => void,
  ): ClientUnaryCall;
  login(
    request: LoginRequest,
    callback: (error: ServiceError | null, response: UsuarioResponse) => void,
  ): ClientUnaryCall;
  login(
    request: LoginRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UsuarioResponse) => void,
  ): ClientUnaryCall;
  login(
    request: LoginRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UsuarioResponse) => void,
  ): ClientUnaryCall;
}

export const UsuarioClient = makeGenericClientConstructor(UsuarioService, "Usuario") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): UsuarioClient;
  service: typeof UsuarioService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}

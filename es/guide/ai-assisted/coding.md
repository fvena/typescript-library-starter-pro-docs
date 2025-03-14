# Codificación con LLM

Los Modelos de Lenguaje Grande (LLM) como GPT-4 y Claude han revolucionado el desarrollo de software, especialmente cuando se trata de escribir código en TypeScript. Este documento explora cómo aprovechar estos modelos para acelerar y mejorar el proceso de codificación al desarrollar bibliotecas con la plantilla TypeScript Library Template Pro.

## Fundamentos de la codificación asistida por LLM

Los LLMs pueden asistir en múltiples aspectos del proceso de codificación, desde generar implementaciones completas hasta ayudar con problemas específicos.

### Cuándo utilizar asistencia de LLM

La asistencia de LLM es particularmente valiosa en ciertas situaciones:

1. **Implementaciones repetitivas**: Cuando necesitas escribir código con patrones similares.
2. **Boilerplate**: Para generar código estándar o estructuras comunes.
3. **Conversión entre lenguajes**: Para traducir código de un lenguaje a TypeScript.
4. **Exploración de APIs**: Para explorar diferentes enfoques para diseñar una API.
5. **Debugging**: Para analizar y corregir errores.
6. **Optimización**: Para mejorar el rendimiento o la legibilidad del código.

### Limitaciones a considerar

Es importante entender las limitaciones actuales:

1. **Contexto limitado**: Los LLMs tienen un contexto limitado y no pueden ver todo tu proyecto.
2. **Conocimiento desactualizado**: Pueden no estar familiarizados con las últimas bibliotecas o características del lenguaje.
3. **Bugs sutiles**: Pueden generar código que parece funcionar pero tiene errores sutiles.
4. **Complejidad del dominio**: Pueden tener dificultades con lógica de negocio muy específica o compleja.

## Técnicas para generación de código efectiva

Para obtener el mejor código de los LLMs, es importante usar técnicas adecuadas de prompt engineering.

### Especificación clara de requisitos

Comienza con una especificación clara de lo que necesitas implementar:

```
Prompt: Necesito implementar una función de validación de email en TypeScript que siga estas especificaciones:
1. Debe validar el formato básico usando expresiones regulares.
2. Debe verificar que el dominio tenga un TLD válido.
3. Debe aceptar un parámetro de opción para permitir o no direcciones temporales (como mailinator.com).
4. Debe retornar un objeto con un booleano 'valid' y un array 'errors' con los problemas encontrados.
```

### Proporcionar contexto relevante

Para obtener código que se integre bien con tu biblioteca, proporciona contexto:

````
Prompt: Estoy desarrollando una biblioteca de validación en TypeScript. Ya tengo definidas las siguientes interfaces y utilidades:

```typescript
interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function createValidationResult(valid: boolean, errors: string[] = []): ValidationResult {
  return { valid, errors };
}

// Otras utilidades disponibles:
// isNullOrUndefined(value: any): boolean
// isString(value: any): boolean
```

Ahora necesito implementar una función `validateEmail(email: string, options?: EmailValidationOptions): ValidationResult` que use estas interfaces y utilidades.

````

### Generación iterativa

La generación de código debe ser un proceso iterativo:

1. **Generar una primera implementación**
2. **Revisar el código** y encontrar problemas o mejoras
3. **Proporcionar feedback específico** para mejorar el código
4. **Refinar la implementación** basándose en el feedback

Ejemplo de prompt de refinamiento:

```

Prompt: El código se ve bien, pero he identificado algunos problemas:

1. La expresión regular para validar el formato básico es demasiado permisiva.
2. No está utilizando la función isString() para verificar el tipo de entrada.
3. La validación de TLD solo comprueba la longitud, no si es un TLD válido.

¿Puedes mejorar estas áreas?

```

### Enfoque en patrones y principios

Pide código que siga buenas prácticas y patrones de diseño:

```

Prompt: Implementa un validador de formularios en TypeScript que siga el patrón Builder para crear cadenas de validación fluidas. Quiero que sea extensible, tipado correctamente, y siga los principios SOLID.

```

## Implementación de componentes clave

Los LLMs destacan en diferentes áreas de implementación para bibliotecas TypeScript.

### Funciones de utilidad

Los LLMs son excelentes para generar funciones de utilidad bien probadas:

```

Prompt: Necesito un conjunto de funciones de utilidad en TypeScript para manipular strings con tipado seguro. Específicamente necesito:

1. Una función para convertir camelCase a kebab-case
2. Una función para truncar texto con una elipsis
3. Una función para strip HTML tags de manera segura
4. Una función para normalizar strings (eliminar acentos, convertir a minúsculas)

Por favor, implementa cada función con documentación JSDoc completa, tests básicos, y tipado correcto.

```

### Clases y estructuras de datos

Para estructuras de datos y clases, especifica claramente la interfaz y comportamiento:

```

Prompt: Implementa una clase `LRUCache<K, V>` en TypeScript que:

1. Implemente una caché de Least Recently Used
2. Tenga métodos get(key), set(key, value), has(key), y delete(key)
3. Limite automáticamente el tamaño y elimine los elementos menos usados
4. Sea completamente tipada y genérica para soportar cualquier tipo de clave y valor
5. Use WeakMap internamente cuando sea apropiado para mejor garbage collection

```

### Interfaces y tipos

Los LLMs pueden generar definiciones de tipos complejas:

```

Prompt: Estoy creando una biblioteca para validación de formularios y necesito una definición de tipos TypeScript para la configuración. Debe cubrir:

1. Reglas de validación (requerido, longitud mínima/máxima, patrón, personalizado)
2. Mensajes de error personalizables
3. Configuración de validación asíncrona
4. Dependencias entre campos
5. Grouping de validaciones
6. Soporte para arrays y objetos anidados

Genera los tipos y interfaces necesarios, con comentarios explicativos.

```

### Tests unitarios

Los LLMs son excelentes generando tests exhaustivos:

````

Prompt: El siguiente código implementa una función de parseo de query strings:

```typescript
function parseQueryString(query: string): Record<string, string | string[]> {
  // Implementación...
}
```

Genera tests unitarios exhaustivos usando Vitest para esta función. Incluye casos de prueba para:

1. Query strings simples (name=value)
2. Múltiples parámetros
3. Parámetros repetidos (que deberían convertirse en arrays)
4. Valores vacíos
5. Caracteres especiales y encoding
6. Casos límite y errores

````

## Patrones avanzados y optimizaciones

Los LLMs pueden ayudar con implementaciones más avanzadas y sofisticadas.

### Type-level programming

TypeScript permite programación a nivel de tipos que puede ser compleja. Los LLMs pueden ayudar:

```

Prompt: Necesito implementar tipos avanzados en TypeScript para mi biblioteca de validación. Específicamente:

1. Un tipo `DeepPartial<T>` que haga todos los campos y sub-campos de un tipo opcional recursivamente
2. Un tipo `PathOf<T>` que genere todas las posibles rutas de acceso a propiedades de un objeto (como 'user.address.street')
3. Un tipo `ValidationSchema<T>` que infiera correctamente el tipo de datos original a partir de un esquema de validación

Por favor implementa estos tipos con ejemplos de uso.

```

### Optimización de rendimiento

Los LLMs pueden sugerir optimizaciones:

````

Prompt: El siguiente procesador de datos es demasiado lento cuando maneja grandes cantidades de entradas:

```typescript
function processData(items: DataItem[]): ProcessedItem[] {
  // Implementación actual...
}
```

¿Puedes optimizar esta función para mejor rendimiento? Considera usar:

1. Estructuras de datos más eficientes
2. Memoización donde apropiado
3. Procesamiento por lotes
4. Algoritmos más eficientes

````

### Estrategias de compatibilidad

Para garantizar amplia compatibilidad:

```

Prompt: Necesito implementar mi biblioteca para que sea compatible con múltiples entornos. ¿Cuáles son buenas prácticas para asegurar que funcione en:

1. Navegadores modernos
2. Navegadores antiguos (IE11)
3. Node.js (CommonJS)
4. Node.js (ESM)
5. Deno
6. Bun

¿Cómo debería configurar el compilador de TypeScript, el empaquetador y la estructura del código para maximizar la compatibilidad?

```

## Ejemplos prácticos

Veamos ejemplos completos de prompts y respuestas para desarrollar componentes reales de una biblioteca.

### Ejemplo 1: Implementación de un sistema de validación

**Prompt inicial:**

```

Estoy desarrollando una biblioteca de validación en TypeScript y necesito implementar un sistema basado en esquemas. Me gustaría que soportara:

1. Validación de tipos primitivos (string, number, boolean)
2. Validación de objetos y arrays
3. Reglas personalizables (min, max, pattern, email, etc.)
4. Validaciones asíncronas
5. Mensajes de error personalizables
6. Inferencia de tipos para los datos validados

¿Puedes implementar las clases y funciones principales para este sistema?

```

**Respuesta del LLM (extracto):**

Aquí tienes una implementación del sistema de validación:

```typescript
// Base types for validation
export type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
};

export type ValidationError = {
  path: string;
  message: string;
  code: string;
};

// Type for validation options
export type ValidatorOptions = {
  abortEarly?: boolean;
  context?: Record<string, any>;
};

// Base validator class
export abstract class Validator<T> {
  protected validations: Array<
    (value: any, options?: ValidatorOptions) => ValidationError | null
  > = [];
  protected asyncValidations: Array<
    (value: any, options?: ValidatorOptions) => Promise<ValidationError | null>
  > = [];

  abstract validate(
    value: unknown,
    options?: ValidatorOptions,
  ): ValidationResult;
  abstract validateAsync(
    value: unknown,
    options?: ValidatorOptions,
  ): Promise<ValidationResult>;

  // Method to validate and cast to the correct type if valid
  public parse(value: unknown, options?: ValidatorOptions): T {
    const result = this.validate(value, options);
    if (!result.valid) {
      throw new ValidationError("Validation failed", result.errors);
    }
    return value as T;
  }

  // Method to validate asynchronously and cast
  public async parseAsync(
    value: unknown,
    options?: ValidatorOptions,
  ): Promise<T> {
    const result = await this.validateAsync(value, options);
    if (!result.valid) {
      throw new ValidationError("Validation failed", result.errors);
    }
    return value as T;
  }

  // Helper to create a new validation error
  protected createError(
    path: string,
    message: string,
    code: string,
  ): ValidationError {
    return { path, message, code };
  }
}

// String validator
export class StringValidator extends Validator<string> {
  constructor() {
    super();
    // Add base type validation
    this.validations.push((value, _options) => {
      if (typeof value !== "string") {
        return this.createError("", "Expected a string", "type_error");
      }
      return null;
    });
  }

  // Fluent API for adding validations
  minLength(length: number, message?: string): this {
    this.validations.push((value, _options) => {
      if (typeof value === "string" && value.length < length) {
        return this.createError(
          "",
          message || `Should be at least ${length} characters long`,
          "min_length",
        );
      }
      return null;
    });
    return this;
  }

  maxLength(length: number, message?: string): this {
    this.validations.push((value, _options) => {
      if (typeof value === "string" && value.length > length) {
        return this.createError(
          "",
          message || `Should be at most ${length} characters long`,
          "max_length",
        );
      }
      return null;
    });
    return this;
  }

  pattern(regex: RegExp, message?: string): this {
    this.validations.push((value, _options) => {
      if (typeof value === "string" && !regex.test(value)) {
        return this.createError(
          "",
          message || `Does not match pattern ${regex}`,
          "pattern",
        );
      }
      return null;
    });
    return this;
  }

  email(message?: string): this {
    return this.pattern(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message || "Should be a valid email address",
    );
  }

  // Custom validation
  custom(
    validator: (value: string) => boolean,
    message: string,
    code = "custom",
  ): this {
    this.validations.push((value, _options) => {
      if (typeof value === "string" && !validator(value)) {
        return this.createError("", message, code);
      }
      return null;
    });
    return this;
  }

  // Custom async validation
  customAsync(
    validator: (value: string) => Promise<boolean>,
    message: string,
    code = "custom",
  ): this {
    this.asyncValidations.push(async (value, _options) => {
      if (typeof value === "string" && !(await validator(value))) {
        return this.createError("", message, code);
      }
      return null;
    });
    return this;
  }

  // Implementation of validate method
  validate(value: unknown, options: ValidatorOptions = {}): ValidationResult {
    const errors: ValidationError[] = [];

    for (const validation of this.validations) {
      const error = validation(value, options);
      if (error) {
        errors.push(error);
        if (options.abortEarly) {
          break;
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Implementation of async validation
  async validateAsync(
    value: unknown,
    options: ValidatorOptions = {},
  ): Promise<ValidationResult> {
    // First do sync validations
    const syncResult = this.validate(value, options);
    if (options.abortEarly && !syncResult.valid) {
      return syncResult;
    }

    const errors = [...syncResult.errors];

    // Then do async validations
    for (const asyncValidation of this.asyncValidations) {
      const error = await asyncValidation(value, options);
      if (error) {
        errors.push(error);
        if (options.abortEarly) {
          break;
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Number validator (similar implementation...)

// Object validator
export class ObjectValidator<
  T extends Record<string, any>,
> extends Validator<T> {
  private shape: Record<string, Validator<any>>;

  constructor(shape: Record<string, Validator<any>>) {
    super();
    this.shape = shape;

    // Add base type validation
    this.validations.push((value, _options) => {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return this.createError("", "Expected an object", "type_error");
      }
      return null;
    });
  }

  // Implementation of validate method for objects
  validate(value: unknown, options: ValidatorOptions = {}): ValidationResult {
    // Check base validations first
    const baseResult = super.validate(value, options);
    if (options.abortEarly && !baseResult.valid) {
      return baseResult;
    }

    const errors = [...baseResult.errors];

    // If not an object, return base errors
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      return { valid: errors.length === 0, errors };
    }

    // Validate each field in the shape
    const obj = value as Record<string, unknown>;

    for (const [key, validator] of Object.entries(this.shape)) {
      if (!(key in obj) && obj[key] !== undefined) {
        errors.push(this.createError(key, `Field is required`, "required"));
        if (options.abortEarly) {
          break;
        }
        continue;
      }

      const fieldResult = validator.validate(obj[key], options);

      if (!fieldResult.valid) {
        // Add the current path to all errors
        errors.push(
          ...fieldResult.errors.map((err) => ({
            ...err,
            path: err.path ? `${key}.${err.path}` : key,
          })),
        );

        if (options.abortEarly) {
          break;
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Implementation of async validation for objects
  async validateAsync(
    value: unknown,
    options: ValidatorOptions = {},
  ): Promise<ValidationResult> {
    // Similar to validate but with async validators
    // Implementation...
  }
}

// Factory functions for easier API
export function string() {
  return new StringValidator();
}

export function number() {
  return new NumberValidator();
}

export function boolean() {
  return new BooleanValidator();
}

export function object<T extends Record<string, Validator<any>>>(shape: T) {
  return new ObjectValidator<{ [K in keyof T]: InferType<T[K]> }>(shape);
}

// Type inference helper
export type InferType<T> = T extends Validator<infer U> ? U : never;

// Example usage:
// const userSchema = object({
//   name: string().minLength(2).maxLength(50),
//   email: string().email(),
//   age: number().min(18).max(120),
//   address: object({
//     street: string(),
//     city: string()
//   })
// });
//
// type User = InferType<typeof userSchema>;
// const user = userSchema.parse(data);
```

**Prompt de seguimiento:**

```
El código se ve bien, pero hay algunas mejoras que podríamos hacer:

1. Falta implementar soporte para arrays y validadores para boolean, date, etc.
2. Me gustaría que los mensajes de error fueran más configurables, quizás con un sistema de templates
3. Sería útil tener una forma de validar condicional (cuando un campo existe, otro es requerido)

¿Puedes mejorar esas áreas?
```

**Respuesta iterativa del LLM:**

El LLM proporcionaría mejoras incrementales basadas en feedback específico, añadiendo validadores para diferentes tipos, mejorando el sistema de mensajes de error, e implementando validaciones condicionales.

### Ejemplo 2: Implementación de un cliente HTTP tipado

**Prompt inicial:**

```
Necesito implementar un cliente HTTP tipado para mi biblioteca TypeScript. Quiero que tenga las siguientes características:

1. Fuertemente tipado con TypeScript
2. Soporte para diferentes métodos (GET, POST, PUT, DELETE, etc.)
3. Manejo elegante de errores
4. Soporte para interceptores (para añadir headers, manejar autenticación, etc.)
5. Cancelación de peticiones
6. Soporte para retry automático
7. Debería funcionar tanto en navegador como en Node.js

¿Puedes implementar la clase principal y métodos para este cliente?
```

**Respuesta del LLM (extracto):**

```typescript
// Types for the HTTP client
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

export interface RequestOptions<D = any> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | null | undefined>;
  data?: D;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: "json" | "text" | "blob" | "arraybuffer";
  signal?: AbortSignal;
  retry?: RetryOptions;
}

export interface RetryOptions {
  count: number;
  delay: number;
  shouldRetry?: (error: HttpError) => boolean;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  request?: any;
}

export class HttpError extends Error {
  readonly name: string = "HttpError";
  readonly status: number;
  readonly statusText: string;
  readonly headers: Record<string, string>;
  readonly data: any;
  readonly request: any;

  constructor(message: string, response: HttpResponse) {
    super(message);
    this.status = response.status;
    this.statusText = response.statusText;
    this.headers = response.headers;
    this.data = response.data;
    this.request = response.request;
  }

  isNetworkError(): boolean {
    return this.status === 0 && !this.statusText;
  }

  isTimeout(): boolean {
    return this.code === "ECONNABORTED";
  }
}

// Interceptor types
export interface RequestInterceptor {
  onFulfilled?: (
    config: RequestOptions,
  ) => RequestOptions | Promise<RequestOptions>;
  onRejected?: (error: any) => any;
}

export interface ResponseInterceptor {
  onFulfilled?: <T>(
    response: HttpResponse<T>,
  ) => HttpResponse<T> | Promise<HttpResponse<T>>;
  onRejected?: (error: HttpError) => any;
}

// Main HTTP client class
export class HttpClient {
  private baseURL: string;
  private defaultOptions: RequestOptions;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(baseURL: string = "", defaultOptions: RequestOptions = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 10000,
      retry: { count: 0, delay: 300 },
      ...defaultOptions,
    };
  }

  // Interceptor methods
  interceptors = {
    request: {
      use: (
        onFulfilled?: RequestInterceptor["onFulfilled"],
        onRejected?: RequestInterceptor["onRejected"],
      ) => {
        const interceptor: RequestInterceptor = { onFulfilled, onRejected };
        this.requestInterceptors.push(interceptor);
        return this.requestInterceptors.length - 1;
      },
      eject: (id: number) => {
        if (id >= 0 && id < this.requestInterceptors.length) {
          this.requestInterceptors.splice(id, 1);
        }
      },
    },
    response: {
      use: (
        onFulfilled?: ResponseInterceptor["onFulfilled"],
        onRejected?: ResponseInterceptor["onRejected"],
      ) => {
        const interceptor: ResponseInterceptor = { onFulfilled, onRejected };
        this.responseInterceptors.push(interceptor);
        return this.responseInterceptors.length - 1;
      },
      eject: (id: number) => {
        if (id >= 0 && id < this.responseInterceptors.length) {
          this.responseInterceptors.splice(id, 1);
        }
      },
    },
  };

  // Helper methods
  private getFullURL(url: string, params?: Record<string, any>): string {
    const fullURL = url.startsWith("http") ? url : `${this.baseURL}${url}`;

    if (!params) {
      return fullURL;
    }

    const queryParams = Object.entries(params)
      .filter(([_, value]) => value != null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
      )
      .join("&");

    return queryParams
      ? `${fullURL}${fullURL.includes("?") ? "&" : "?"}${queryParams}`
      : fullURL;
  }

  private async applyRequestInterceptors(
    config: RequestOptions,
  ): Promise<RequestOptions> {
    let currentConfig = { ...config };

    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onFulfilled) {
        try {
          currentConfig = await interceptor.onFulfilled(currentConfig);
        } catch (error) {
          if (interceptor.onRejected) {
            throw interceptor.onRejected(error);
          }
          throw error;
        }
      }
    }

    return currentConfig;
  }

  private async applyResponseInterceptors<T>(
    response: HttpResponse<T>,
  ): Promise<HttpResponse<T>> {
    let currentResponse = response;

    for (const interceptor of this.responseInterceptors) {
      if (interceptor.onFulfilled) {
        try {
          currentResponse = await interceptor.onFulfilled(currentResponse);
        } catch (error) {
          if (interceptor.onRejected) {
            return interceptor.onRejected(error) as any;
          }
          throw error;
        }
      }
    }

    return currentResponse;
  }

  private handleError(error: any, response?: HttpResponse): never {
    if (response) {
      throw new HttpError(
        `Request failed with status ${response.status}`,
        response,
      );
    }
    throw error;
  }

  // Main request method
  async request<T = any, D = any>(
    url: string,
    options: RequestOptions<D> = {},
  ): Promise<HttpResponse<T>> {
    const config = await this.applyRequestInterceptors({
      ...this.defaultOptions,
      ...options,
    });

    const {
      method = "GET",
      headers,
      params,
      data,
      timeout,
      withCredentials,
      signal,
      retry,
    } = config;
    const fullURL = this.getFullURL(url, params);

    const fetchOptions: RequestInit = {
      method,
      headers: headers as HeadersInit,
      credentials: withCredentials ? "include" : "same-origin",
      signal,
    };

    // Add body for non-GET requests
    if (method !== "GET" && method !== "HEAD" && data !== undefined) {
      fetchOptions.body = headers?.["Content-Type"]?.includes(
        "application/json",
      )
        ? JSON.stringify(data)
        : (data as any);
    }

    // Implement retry logic
    const makeRequest = async (retryCount = 0): Promise<HttpResponse<T>> => {
      try {
        // Create an AbortController for timeout
        const controller = new AbortController();
        let timeoutId: NodeJS.Timeout | undefined;

        if (timeout && !signal) {
          timeoutId = setTimeout(() => controller.abort(), timeout);
          fetchOptions.signal = controller.signal;
        }

        const response = await fetch(fullURL, fetchOptions);
        if (timeoutId) clearTimeout(timeoutId);

        const responseData = await this.parseResponse<T>(
          response,
          config.responseType,
        );

        const httpResponse: HttpResponse<T> = {
          data: responseData,
          status: response.status,
          statusText: response.statusText,
          headers: this.parseHeaders(response.headers),
          request: { url: fullURL, ...fetchOptions },
        };

        // Handle error responses
        if (!response.ok) {
          // Apply retry if configured
          if (retry && retryCount < retry.count) {
            const shouldRetry = retry.shouldRetry
              ? retry.shouldRetry(
                  new HttpError(
                    `Request failed with status ${response.status}`,
                    httpResponse,
                  ),
                )
              : response.status >= 500 || response.status === 429;

            if (shouldRetry) {
              await new Promise((resolve) => setTimeout(resolve, retry.delay));
              return makeRequest(retryCount + 1);
            }
          }

          return this.handleError(null, httpResponse);
        }

        return this.applyResponseInterceptors(httpResponse);
      } catch (error) {
        if (
          retry &&
          retryCount < retry.count &&
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          await new Promise((resolve) => setTimeout(resolve, retry.delay));
          return makeRequest(retryCount + 1);
        }
        throw error;
      }
    };

    return makeRequest();
  }

  // Helper methods for different HTTP methods
  get<T = any>(
    url: string,
    options: Omit<RequestOptions, "method" | "data"> = {},
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  post<T = any, D = any>(
    url: string,
    data?: D,
    options: Omit<RequestOptions, "method" | "data"> = {},
  ): Promise<HttpResponse<T>> {
    return this.request<T, D>(url, { ...options, method: "POST", data });
  }

  put<T = any, D = any>(
    url: string,
    data?: D,
    options: Omit<RequestOptions, "method" | "data"> = {},
  ): Promise<HttpResponse<T>> {
    return this.request<T, D>(url, { ...options, method: "PUT", data });
  }

  delete<T = any>(
    url: string,
    options: Omit<RequestOptions, "method"> = {},
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }

  patch<T = any, D = any>(
    url: string,
    data?: D,
    options: Omit<RequestOptions, "method" | "data"> = {},
  ): Promise<HttpResponse<T>> {
    return this.request<T, D>(url, { ...options, method: "PATCH", data });
  }

  // Helper methods
  private async parseResponse<T>(
    response: Response,
    responseType: RequestOptions["responseType"] = "json",
  ): Promise<T> {
    switch (responseType) {
      case "text":
        return (await response.text()) as unknown as T;
      case "blob":
        return (await response.blob()) as unknown as T;
      case "arraybuffer":
        return (await response.arrayBuffer()) as unknown as T;
      case "json":
      default:
        // Handle empty responses
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    }
  }

  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  // Factory method to create a cancellable request
  createCancellable<T = any, D = any>(
    url: string,
    options: RequestOptions<D> = {},
  ) {
    const controller = new AbortController();

    const promise = this.request<T, D>(url, {
      ...options,
      signal: controller.signal,
    });

    return {
      promise,
      cancel: () => controller.abort(),
    };
  }
}

// Example usage:
// const api = new HttpClient('https://api.example.com', {
//   headers: {
//     'Authorization': 'Bearer token'
//   },
//   timeout: 5000
// });
//
// // Add request interceptor for authentication
// api.interceptors.request.use(config => {
//   // Add auth token
//   return config;
// });
//
// // Add response interceptor for error handling
// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.status === 401) {
//       // Handle unauthorized
//     }
//     return Promise.reject(error);
//   }
// );
//
// // Make typed requests
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }
//
// const getUsers = () => api.get<User[]>('/users');
// const createUser = (userData: Omit<User, 'id'>) => api.post<User, Omit<User, 'id'>>('/users', userData);
```

**Prompt de seguimiento:**

```
El cliente HTTP es bueno, pero tengo algunas mejoras que me gustaría ver:

1. Soporte para serialización de formularios y FormData
2. Una opción para establecer una configuración global de caché
3. Métodos helper para descargar y subir archivos
4. Algunas utilidades para testear/mockear el cliente

¿Puedes implementar esas mejoras?
```

**Respuesta iterativa del LLM:**

El LLM proporcionaría las mejoras solicitadas, añadiendo soporte para formularios, opciones de caché, utilidades para manejar archivos y herramientas para testing.

## Estrategias para manejar código complejo

El desarrollo de bibliotecas a menudo requiere implementar lógica compleja. Los LLMs pueden ayudar con diferentes estrategias.

### Dividir y conquistar

Para problemas complejos, es mejor dividirlos en partes más pequeñas:

```
Prompt: Necesito implementar un sistema de componentes reactivos en TypeScript para mi biblioteca de UI. En lugar de implementarlo todo a la vez, vamos a dividirlo en partes:

1. Primero, ayúdame a diseñar el sistema de reactividad básico (similar a un sistema de observables).
2. Luego implementaremos el sistema de componentes que utiliza esa reactividad.
3. Finalmente, añadiremos un mecanismo de renderizado virtual DOM.

Comencemos con la parte 1: ¿Cómo implementarías un sistema de reactividad básico que permita observar cambios en propiedades y ejecutar funciones reactivamente?
```

### Implementación incremental de características

Construye características incrementalmente, comenzando con un MVP:

```
Prompt: Estoy implementando un sistema de enrutamiento para mi biblioteca. Comencemos con una versión básica que solo admita rutas estáticas y navegación programática. Después añadiremos rutas con parámetros, rutas anidadas, carga perezosa y otras características.

¿Cómo sería la implementación de la versión básica?
```

### Optimización iterativa

Comienza con código funcional y luego optimiza:

````
Prompt: Tengo una implementación inicial de un sistema de caché para mi biblioteca, pero está causando problemas de rendimiento cuando maneja grandes conjuntos de datos:

```typescript
// Implementación actual
```

¿Puedes analizar los posibles cuellos de botella y proponer optimizaciones?

````

## Refactorización y mejora de código

Los LLMs son particularmente útiles para refactorizar código existente.

### Modernización de código

Para actualizar código a prácticas modernas:

````

Prompt: Este código está escrito en TypeScript antiguo (pre-ES6) y usa patrones obsoletos. ¿Puedes refactorizarlo para usar características modernas como:

1. Sintaxis ES6+ (arrow functions, async/await, etc.)
2. APIs más modernas de DOM/HTTP
3. Buenas prácticas actuales de TypeScript (tipos más precisos, genéricos, etc.)
4. Patrones de diseño más actuales

```typescript
// Código antiguo
```

````

### Mejora de tipos en TypeScript

Para mejorar la seguridad de tipos:

````

Prompt: Este código tiene tipado deficiente. Por favor, mejora las definiciones de tipos para:

1. Eliminar todos los usos de `any`
2. Usar genéricos apropiadamente
3. Definir interfaces claras para las estructuras de datos
4. Añadir comprobaciones de tipo de tiempo de ejecución

```typescript
// Código con mal tipado
```

````

### Corrección de patrones problemáticos

Para identificar y corregir problemas:

````

Prompt: Este código tiene varios problemas de diseño y antipatrones:

1. Uso excesivo de singleton
2. Objetos demasiado grandes con muchas responsabilidades
3. Lógica de negocio mezclada con lógica de UI
4. Funciones demasiado largas y anidadas

¿Puedes refactorizarlo para seguir principios SOLID y mejorar su mantenibilidad?

```typescript
// Código problemático
```

````

## Documentación y comentarios

Los LLMs destacan en generar documentación de calidad para el código.

### Documentación JSDoc

Para generar documentación JSDoc completa:

````

Prompt: Por favor, añade documentación JSDoc completa a este código de biblioteca. Incluye:

1. Descripción de cada función, clase e interfaz
2. Documentación de parámetros con tipos
3. Valores de retorno y posibles excepciones
4. Ejemplos de uso para funciones públicas
5. Referencias a otras partes de la API cuando sea relevante

```typescript
// Código a documentar
```

````

### Generación de guías de uso

Para crear guías detalladas:

````

Prompt: Necesito crear un archivo README.md detallado para mi biblioteca de validación. Debe incluir:

1. Introducción y propósito de la biblioteca
2. Guía de instalación
3. Ejemplos básicos y avanzados de uso
4. API completa con todas las funciones y opciones
5. Guía de migración desde versiones anteriores
6. Comparación con alternativas populares
7. Preguntas frecuentes

Aquí está la API pública de la biblioteca:

```typescript
// API pública
```

````

### Estrategias de migración

Para documentar cambios entre versiones:

```

Prompt: Estoy implementando la versión 2.0 de mi biblioteca con cambios importantes. Necesito una guía de migración detallada para usuarios que actualizan desde la versión 1.x. Las principales diferencias son:

1. Cambio de una API basada en clases a una funcional
2. Nuevo sistema de plugins
3. Diferentes opciones de configuración
4. Cambios en el comportamiento por defecto de algunas funciones

¿Puedes crear una guía de migración detallada con ejemplos de código?

```

## Depuración y resolución de problemas

Los LLMs pueden ayudar a identificar y resolver problemas en el código.

### Análisis de errores

Para analizar y corregir errores:

````

Prompt: Estoy obteniendo este error al ejecutar mi biblioteca:

```

TypeError: Cannot read property 'map' of undefined
    at parseData (/src/parser.ts:42:10)
    at processInput (/src/processor.ts:15:22)
    at handleRequest (/src/handler.ts:8:15)

```

Aquí está el código relevante:

```typescript
// Código relevante
```

¿Puedes ayudarme a identificar la causa raíz y proporcionar una solución?

````

### Análisis de rendimiento

Para identificar problemas de rendimiento:

````

Prompt: Mi biblioteca está experimentando problemas de rendimiento en esta función particular que procesa grandes conjuntos de datos:

```typescript
// Función con problemas
```

Los usuarios informan que cuando manejan más de 10,000 elementos, la función se vuelve extremadamente lenta. ¿Puedes identificar cuellos de botella potenciales y sugerir optimizaciones?

````

### Manejo de casos límite

Para identificar y manejar casos límite:

```

Prompt: Mi biblioteca de validación funciona bien en casos normales, pero falla en estos casos límite:

1. Cuando se proporcionan objetos cíclicos
2. Cuando un objeto tiene propiedades con valores undefined o NULL
3. Cuando hay campos muy anidados (más de 10 niveles)

¿Cómo puedo mejorar mi código para manejar estos casos límite correctamente?

```

## Buenas prácticas

Para obtener los mejores resultados al codificar con asistencia de LLM, considera estas prácticas.

### Iteración y refinamiento

El desarrollo con LLMs debe ser iterativo:

1. **Start small**: Comienza con versiones simplificadas y básicas
2. **Review thoroughly**: Revisa cuidadosamente cada generación
3. **Provide feedback**: Da feedback específico sobre lo que funciona y lo que no
4. **Iterate**: Refina el código gradualmente con cada interacción

### Proporcionar contexto suficiente

Cuanto más contexto proporciones, mejores serán los resultados:

1. **Código existente**: Comparte código relevante existente
2. **Restricciones**: Explica limitaciones específicas de entorno o rendimiento
3. **Estilo de código**: Menciona convenciones de estilo a seguir
4. **Dependencias**: Menciona bibliotecas externas que estás utilizando

### Verificación y pruebas

Nunca uses código generado por IA sin verificarlo:

1. **Inspección manual**: Revisa el código línea por línea
2. **Tests unitarios**: Escribe tests para validar el comportamiento
3. **Edge cases**: Prueba casos límite específicamente
4. **Runtime validation**: Implementa validaciones en tiempo de ejecución para detectar errores sutiles

## Integración con editores y herramientas

Muchos IDEs y editores ofrecen integraciones directas con LLMs.

### GitHub Copilot

GitHub Copilot se integra directamente en editores como VS Code:

1. **Suggestions inline**: Sugiere código mientras escribes
2. **Copilot chat**: Permite conversaciones interactivas sobre código
3. **Context awareness**: Utiliza archivos abiertos como contexto

### Cursor

Cursor es un editor basado en VS Code con potentes integraciones de IA:

1. **Code generation**: Genera código completo basado en prompts
2. **Editing assistance**: Ayuda a refactorizar y mejorar código existente
3. **Holistic view**: Comprende el proyecto a un nivel más amplio

### OpenAI API y otros LLMs

Para necesidades más personalizadas, puedes integrar LLMs directamente:

1. **Custom tools**: Crea herramientas personalizadas con las APIs de OpenAI, Anthropic, etc.
2. **Specialized agents**: Desarrolla agentes especializados para tareas específicas
3. **CI/CD integration**: Integra LLMs en tu pipeline de CI/CD para revisión automática de código

## Consideraciones éticas y legales

Al usar LLMs para codificar, hay consideraciones importantes a tener en cuenta.

### Propiedad intelectual

El código generado por IA plantea preguntas de propiedad intelectual:

1. **Training data**: Los LLMs se entrenan con código con diversas licencias
2. **Output licensing**: Clarifica la licencia del código generado
3. **Attribution**: Considera si es necesario atribuir código generado por IA

### Seguridad

El código generado por IA puede tener problemas de seguridad:

1. **Security review**: Revisa el código en busca de vulnerabilidades
2. **Never trust blindly**: No confíes ciegamente en código generado para funciones críticas
3. **Known patterns**: Los LLMs pueden reproducir patrones inseguros conocidos

## Conclusión

La codificación asistida por LLM ha transformado el desarrollo de bibliotecas TypeScript, ofreciendo numerosas ventajas:

1. **Velocidad**: Acelera significativamente el tiempo de desarrollo
2. **Exploración**: Facilita explorar diferentes enfoques e implementaciones
3. **Calidad**: Puede mejorar la calidad y consistencia del código
4. **Aprendizaje**: Proporciona oportunidades educativas sobre patrones y técnicas

Sin embargo, es importante mantener una perspectiva equilibrada:

1. **Supervisión humana**: El juicio humano sigue siendo crucial
2. **Verificación**: Siempre verifica y prueba código generado
3. **Herramienta, no reemplazo**: Los LLMs son herramientas para potenciar, no reemplazar desarrolladores

La combinación de experiencia humana con asistentes LLM representa un nuevo paradigma en el desarrollo de bibliotecas, permitiendo crear código más robusto, bien documentado y mantenible en menos tiempo.

## Siguientes pasos

Una vez que hayas implementado tu biblioteca con la ayuda de LLMs, el siguiente paso natural es probar y depurar tu código. Consulta [Testing y depuración](/ai-assisted/testing.md) para aprender cómo la IA puede ayudarte en el proceso de garantizar la calidad de tu biblioteca.

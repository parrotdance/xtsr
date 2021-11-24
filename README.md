# XTsr
EXtreme-fast Typescript Runner.

A CLI program that runs your **Typescript file** directly in Nodejs. IMMEDIATLY. ⚡️

# Install
```bash
npm install -g xtsr
```

# Usage
### Run typescript file simply
```typescript
// sample.ts
console.log('Hello world')
```
```bash
> tsr sample.ts
Hello world
```

### Run typescript file with arguments
```typescript
// sample.ts
console.log(process.argv.slice(2))
```
```bash
> tsr sample.ts --foo --bar=baz
[
  '--foo',
  '--bar=baz'
]
```
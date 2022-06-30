# POC XO Lite

- Clone
- Copy `.env.dist` to `.env` and set vars
- `yarn`
- `yarn dev`

## Conventions

### Vue Components

Use Vue Single File Components (`*.vue`).

Insert blocks in the following order: `template`, `script` then `style`

#### Template

Use HTML

#### Script

Use composition API + TypeScript + `setup` attribute (`<script lang="ts" setup>`)

Note: When reading Vue official doc, don't forget to set "API Preference" toggle (in the upper left) on "Composition"

```vue

<script lang="ts" setup>
  import { ref, computed } from 'vue';

  const props = defineProps<{
    greetings: string
  }>();

  const firstName = ref('')
  const lastName = ref('')

  const fullName = computed(() => `${props.greetings} ${firstName.value} ${lastName.value}`);
</script>
```

#### CSS

Use SCSS + `scoped` attribute (`<style lang="scss" scoped>`)

Interpolate Vue variables with `v-bind`

```vue

<script lang="ts" setup>
  import { ref } from 'vue';

  const fontSize = ref('2rem');
</script>

<style lang="scss" scoped>
  .my-item {
    font-size: v-bind(fontSize)
  }
</style>
```

### CSS

Always use `rem` unit (`1rem` = `10px`)

### Store

Use Pinia store with setup function.

State are `ref`

Getters are `computed`

Actions/Mutations are simple functions

#### Naming convention

For a `foobar` store, create a `store/foobar.store.ts` then use `defineStore('foobar', setupFunc)`

#### Example

```typescript
import { ref, computed } from 'vue';

export const useFoobarStore = defineStore('foobar', () => {
  const aStateVar = ref(0);
  const otherStateVar = ref(0);
  const aGetter = computed(() => aStateVar.value * 2)
  const anAction = () => otherStateVar.value += 10;

  return {
    aStateVar,
    otherStateVar,
    aGetter,
    anAction,
  }
})
```

#### Xen Api Collection Stores

When creating a store for a Xen Api objects collection, use the `createXenApiCollectionStoreContext` helper.

```typescript
export const useConsoleStore = defineStore(
  'console',
  () => createXenApiCollectionStoreContext('console'),
);
```

##### Extending the base context

Here is how to extend the base context:

```typescript
import { computed } from 'vue';

export const useFoobarStore = defineStore(
  'foobar',
  () => {
    const baseContext = createXenApiCollectionStoreContext('foobar');

    const myCustomGetter = computed(() => baseContext.ids.reverse());

    return {
      ...baseContext,
      myCustomGetter,
    }
  }
)
```

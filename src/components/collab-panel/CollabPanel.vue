<script setup lang="ts">
import { computed } from 'vue'

import { isCloudBinding } from '@/app/cloud/integration'
import { useEditorStore } from '@/app/editor/active-store'
import { CloudShareButton } from '@/components/cloud/integration'
import CollabAvatarStack from '@/components/collab-panel/CollabAvatarStack.vue'
import CollabSharePopover from '@/components/collab-panel/CollabSharePopover.vue'
import { provideCollabPanel } from '@/components/collab-panel/context'

const store = useEditorStore()
// Cloud documents share through their server; everything else through a peer-to-peer room.
const cloud = computed(() => isCloudBinding(store.getStorageBinding()))

// Provides the panel's context to its children; the panel itself shows no voice-call control.
provideCollabPanel()
</script>

<template>
  <div class="flex w-full items-center justify-end gap-1.5">
    <CollabAvatarStack />
    <div class="flex-1" />
    <CloudShareButton v-if="cloud" />
    <CollabSharePopover v-else />
  </div>
</template>

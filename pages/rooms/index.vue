<script setup lang="ts">
import { getRooms } from "@/api/instances/rooms.ts";

const { data } = await getRooms();
</script>

<template>
  <div class="text-white">
    <div v-for="room in data?.result" :key="room._id" class="flex">
      <div>
        <img :src="room.imageUrl" :alt="room.description">
      </div>
      <div>
        {{ room.name }}
      </div>
    </div>
  </div>
</template>

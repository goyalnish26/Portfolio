# 05 — Atmosphere-Engine.md

# Portfolio V3

## Atmosphere Engine

---

# Purpose

The Atmosphere Engine is responsible for making the portfolio feel alive.

It is **not** an animation engine.

It is **not** a particle engine.

It is **not** a visual effects system.

Its only responsibility is to create the feeling that the world continues existing even when the visitor does nothing.

Visitors should never consciously notice the Atmosphere Engine.

They should simply feel that something about the portfolio feels different.

That feeling is the objective.

---

# Core Philosophy

The website should behave like a real environment.

Real environments never completely stop.

Air moves.

Light changes.

Dust floats.

Glass reflects.

Clouds drift.

Time passes.

The portfolio should behave the same way.

---

# Atmosphere Hierarchy

The environment is divided into independent systems.

These systems never depend on one another.

```
World
│
├── Ambient Light
├── Time Engine
├── Weather Engine
├── Reflection Engine
├── Environment Particles
├── Background Motion
├── Window Simulation
├── Presence Engine
├── Idle Engine
└── Spider Ecology
```

Each system operates independently.

If one system is disabled,

the others continue functioning normally.

---

# Design Philosophy

Atmosphere should never become entertainment.

Visitors should never stop reading simply to watch the background.

Content is always the hero.

Atmosphere is invisible support.

If the visitor consciously notices an atmospheric effect,

it is probably too strong.

---

# Environmental Layers

The world should consist of multiple layers.

Layer Zero

Solid background.

Never moves.

---

Layer One

Noise.

Very slow.

Almost invisible.

---

Layer Two

Soft gradients.

Drift continuously.

---

Layer Three

Light.

Moves over several minutes.

Never loops obviously.

---

Layer Four

Dust particles.

Very few.

Random.

Different speeds.

---

Layer Five

Glass reflections.

React to lighting.

Not scrolling.

---

Layer Six

Interactive content.

---

Each layer has a different speed.

No two layers should move identically.

---

# Ambient Motion

The environment should never appear frozen.

Even during complete inactivity,

tiny motion should continue.

Examples

Moving gradients.

Tiny floating dust.

Subtle light drift.

Reflection shimmer.

Background breathing.

Movement should remain below conscious perception.

---

# Time Engine

The portfolio should understand time.

Morning.

Afternoon.

Evening.

Night.

The transition should never be immediate.

Changes happen slowly.

The visitor should not notice the transition.

Only the feeling.

---

## Morning

Cool darkness disappears.

Glass becomes cleaner.

Background slightly brighter.

Lighting warmer.

Reflections stronger.

Atmosphere optimistic.

---

## Afternoon

Balanced lighting.

Neutral shadows.

Minimal atmosphere.

Maximum readability.

---

## Evening

Golden edge lighting.

Longer shadows.

Warm reflections.

Calm environment.

---

## Night

Cool blue lighting.

Softer reflections.

Deeper shadows.

More atmosphere.

Never become dark enough to reduce readability.

---

# Time Transitions

Never instantly swap themes.

Lighting should evolve naturally.

Transitions should require several seconds.

Users should almost never witness them.

---

# Weather Engine

Weather exists only to increase immersion.

Weather never becomes a feature.

The visitor should discover it naturally.

---

## Lightning

Night only.

Very rare.

One subtle flash.

No dramatic storms.

No repeated flashing.

Window briefly reflects the light.

Everything returns to normal.

---

## Rain

Extremely rare.

Night preferred.

Only after prolonged presence.

Rain should exist outside the workspace.

Never on top of content.

Tiny droplets may appear on glass.

No heavy rainfall.

No loud sound.

---

## Fog

Occasional.

Very subtle.

Mostly visible through lighting.

Never reduce readability.

---

## Clear Sky

Default state.

The majority of visits should experience calm weather.

---

# Weather Probability

The website should never feel scripted.

Weather should be unpredictable.

Rain should remain special.

Lightning should remain memorable.

Fog should remain subtle.

Clear conditions should dominate.

Visitors should never expect the next event.

---

# Ambient Lighting

Light is the primary storytelling tool.

Lighting should evolve independently.

Never pulse.

Never flash.

Never animate rapidly.

Light should move like sunlight through a room.

Very slowly.

---

# Reflection Engine

Glass surfaces should behave like glass.

Reflections respond to

Mouse movement.

Scrolling.

Ambient lighting.

Time of day.

Reflections never stop completely.

Even stationary glass remains alive.

---

# Background Life

Backgrounds should feel deep.

Not animated.

Deep.

Methods

Slow gradients.

Noise.

Micro parallax.

Lighting.

Soft atmospheric haze.

Avoid excessive particles.

Avoid large decorative graphics.

---

# Presence Engine

The website should acknowledge presence without speaking.

The longer the visitor stays,

the more natural the environment becomes.

Examples

Lighting slightly settles.

Atmosphere deepens.

Spider becomes slightly easier to encounter.

Reflections become richer.

No notifications.

No achievements.

No rewards.

Only atmosphere.

---

# Idle Engine

When the visitor becomes inactive,

the world should continue.

Not faster.

Not slower.

Simply quieter.

---

## Idle Detection

Monitor

Mouse movement.

Keyboard input.

Touch input.

Scrolling.

After approximately two minutes,

the workspace enters its calmest state.

---

## Idle State

Lighting softens.

Background deepens.

Glass reflections slow.

Noise slightly increases.

A distant lightning flash may occur.

Tiny message appears briefly.

"It gets interesting after dark."

The message fades naturally.

Never repeat during the same idle session.

---

# World Continuity

The environment should never restart when changing sections.

The world exists independently of scrolling.

The visitor moves through it.

The world does not move around the visitor.

---

# Audio Philosophy

The portfolio should remain completely usable without sound.

Ambient audio is optional.

If ever introduced,

it must be disabled by default.

No automatic playback.

No surprise audio.

Silence is part of the experience.

---

# Spider Ecology

The spider belongs to the environment.

Not the interface.

It has no purpose.

It asks for nothing.

It teaches nothing.

It simply exists.

The spider should feel like discovering a bird in a quiet garden.

Unexpected.

Natural.

Peaceful.

Its implementation details are defined in

06-Living-Spider-System.md

---

# Performance Rules

The Atmosphere Engine must be the lowest priority system.

If system resources become limited,

atmospheric effects should gracefully reduce before interactive features.

Reading.

Navigation.

Scrolling.

Accessibility.

Content.

These always take priority.

Atmosphere is optional.

Experience is not.

---

# Accessibility

Respect reduced motion.

If reduced motion is enabled,

replace movement with subtle lighting changes.

Never remove content.

Never reduce usability.

Atmosphere should adapt,

not disappear completely.

---

# Mobile Behaviour

Mobile devices receive a simplified atmosphere.

Reduce particle count.

Reduce reflection updates.

Reduce blur complexity.

Disable expensive shaders.

Maintain the feeling.

Not the implementation.

Battery life is part of the experience.

---

# Failure Philosophy

If the Atmosphere Engine fails to load,

the portfolio should still feel complete.

The user should lose ambience,

never functionality.

Atmosphere is enhancement.

Never dependency.

---

# Definition of Success

A successful Atmosphere Engine creates an emotional response that visitors cannot explain.

They should never say

"I liked the particles."

They should never say

"The rain effect was cool."

Instead they should say

"I don't know why...

but that website felt alive."

When the environment quietly supports the story without demanding attention,

the Atmosphere Engine has achieved perfection.

import { ref, computed } from "vue"
import { filterObject, getBooleanQueryParam } from "@/helpers"
import RockIcon from "@/assets/icon-rock.svg"
import PaperIcon from "@/assets/icon-paper.svg"
import ScissorsIcon from "@/assets/icon-scissors.svg"
import LizardIcon from "@/assets/icon-lizard.svg"
import SpockIcon from "@/assets/icon-spock.svg"

export const bonus = ref(getBooleanQueryParam("bonus"))

export type BaseIcons = {
  scissors: Icon
  paper: Icon
  rock: Icon
  lizard: Icon
  spock: Icon
}

export type Signal = keyof BaseIcons | "empty"

export const baseIcons: BaseIcons = {
  scissors: {
    icon: ScissorsIcon,
    color: "var(--scissors-gradient)",
  },
  paper: {
    icon: PaperIcon,
    color: "var(--paper-gradient)",
  },
  rock: {
    icon: RockIcon,
    color: "var(--rock-gradient)",
  },
  lizard: {
    icon: LizardIcon,
    color: "var(--lizard-gradient)",
  },
  spock: {
    icon: SpockIcon,
    color: "var(--cyan-gradient)",
  },
}

export const icons = computed(() =>
  filterObject(baseIcons, ([iconName]) => {
    if (bonus.value) return true

    return !["lizard", "spock"].includes(iconName)
  })
)

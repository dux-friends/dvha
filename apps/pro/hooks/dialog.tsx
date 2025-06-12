import type { JsonSchemaData } from '@duxweb/dvha-core'
import type { VNode } from 'vue'
import { useOverlay } from '@duxweb/dvha-core'

export interface UseDialogResult {
  confirm: (props: UseDialogProps) => Promise<any>
  success: (props: UseDialogProps) => Promise<any>
  error: (props: UseDialogProps) => Promise<any>
  node: (props: UseDialogProps) => Promise<any>
  prompt: (props: UseDialogProps) => Promise<any>
}
export interface UseDialogProps {
  title?: string
  content?: string
  type?: 'confirm' | 'error' | 'success' | 'prompt' | 'node'
  formSchema?: JsonSchemaData
  render?: () => VNode
}

export function useDialog(): UseDialogResult {
  const overlay = useOverlay()

  const show = (props: UseDialogProps) => {
    return overlay.show({
      component: () => import('../components/dialog/dialog'),
      componentProps: props,
    })
  }

  const confirm = (props: UseDialogProps) => {
    return show({ ...props, type: 'confirm' })
  }
  const success = (props: UseDialogProps) => {
    return show({ ...props, type: 'success' })
  }
  const error = (props: UseDialogProps) => {
    return show({ ...props, type: 'error' })
  }
  const prompt = (props: UseDialogProps) => {
    return show({ ...props, type: 'prompt' })
  }
  const node = (props: UseDialogProps) => {
    return show({ ...props, type: 'node' })
  }

  return {
    confirm,
    success,
    error,
    prompt,
    node,
  }
}

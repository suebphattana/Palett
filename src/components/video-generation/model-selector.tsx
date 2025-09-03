'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Check, ChevronDown, Crown, Zap, Clock, Sparkles, Microscope } from 'lucide-react'
import { VIDEO_MODELS } from '@/lib/fal'

interface ModelSelectorProps {
  selectedModel: string | null
  onModelSelect: (model: string) => void
}

const MODEL_CONFIGS = {
  HAILUO: {
    ...VIDEO_MODELS.HAILUO,
    icon: Crown,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    recommended: true
  },
  LUMA: {
    ...VIDEO_MODELS.LUMA,
    icon: Zap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    recommended: false
  },
  KLING: {
    ...VIDEO_MODELS.KLING,
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    recommended: false
  },
  WAN_T2V: {
    ...VIDEO_MODELS.WAN_T2V,
    icon: Microscope,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    recommended: false
  }
}

export function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const selectedConfig = selectedModel ? MODEL_CONFIGS[selectedModel as keyof typeof MODEL_CONFIGS] : null
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">AI Model</h3>
          <p className="text-xs text-muted-foreground">Choose your video generation model</p>
        </div>
        {selectedConfig?.recommended && (
          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
            <Sparkles className="w-3 h-3 mr-1" />
            Recommended
          </Badge>
        )}
      </div>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-auto p-3 justify-between hover:bg-accent/50"
          >
            <div className="flex items-center space-x-3">
              {selectedConfig ? (
                <>
                  <div className={`p-2 rounded-md ${selectedConfig.bgColor}`}>
                    <selectedConfig.icon className={`h-4 w-4 ${selectedConfig.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{selectedConfig.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedConfig.credits} credit{selectedConfig.credits !== 1 ? 's' : ''} • 
                      Max {selectedConfig.maxDuration}s
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground text-sm">Select a model...</div>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-[400px] p-2" align="start">
          {Object.entries(MODEL_CONFIGS).map(([key, config]) => {
            const Icon = config.icon
            const isSelected = selectedModel === key
            
            return (
              <DropdownMenuItem
                key={key}
                className="p-3 cursor-pointer hover:bg-accent rounded-md"
                onClick={() => {
                  onModelSelect(key)
                  setIsOpen(false)
                }}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className={`p-2 rounded-md ${config.bgColor} shrink-0`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{config.name}</h4>
                      <div className="flex items-center space-x-2">
                        {config.recommended && (
                          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                            Best
                          </Badge>
                        )}
                        {isSelected && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {config.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-primary">
                        {config.credits} credit{config.credits !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Max {config.maxDuration}s videos
                      </div>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {config.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {selectedConfig && (
        <div className="bg-accent/30 border rounded-lg p-3">
          <div className="flex items-center space-x-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span className="font-medium">{selectedConfig.name}</span>
            <span className="text-muted-foreground">selected</span>
          </div>
        </div>
      )}
    </div>
  )
}
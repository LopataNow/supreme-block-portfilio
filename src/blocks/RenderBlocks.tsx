import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FixedHero } from '@/blocks/FixedHero/Component'
import { HomeDescription } from '@/blocks/HomeDescription/Component'
import { HomeServices } from '@/blocks/HomeServices/Component'
import { HomeSkills } from '@/blocks/HomeSkills/Component'
import { HomeContact } from '@/blocks/HomeContact/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  fixedHero: FixedHero,
  formBlock: FormBlock,
  homeContact: HomeContact,
  homeDescription: HomeDescription,
  homeServices: HomeServices,
  homeSkills: HomeSkills,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  // Separate fixedHero from subsequent content to achieve the fixed background effect
  const fixedHeroBlock = blocks.find((b) => b.blockType === 'fixedHero')
  const contentBlocks = blocks.filter((b) => b.blockType !== 'fixedHero')

  return (
    <Fragment>
      {fixedHeroBlock && (
        <FixedHero
          name={fixedHeroBlock.name}
          title={fixedHeroBlock.title}
          subtitle={fixedHeroBlock.subtitle}
        />
      )}

      {/* Overlapping content container matching old .home-content behavior */}
      <div
        className={
          fixedHeroBlock
            ? 'relative z-10 mt-[100vh] bg-background text-foreground shadow-[0_-4px_24px_rgba(0,0,0,0.12),0_1px_8px_rgba(0,0,0,0.08)] py-12 px-6 sm:px-12 md:px-24 transition-colors duration-200'
            : 'relative z-10'
        }
      >
        <div className="container max-w-5xl mx-auto">
          {contentBlocks.map((block, index) => {
            const { blockType } = block

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType]

              if (Block) {
                return (
                  <div className="my-12" key={index}>
                    {/* @ts-expect-error type variance across heterogeneous block configurations */}
                    <Block {...block} disableInnerContainer />
                  </div>
                )
              }
            }
            return null
          })}
        </div>
      </div>
    </Fragment>
  )
}


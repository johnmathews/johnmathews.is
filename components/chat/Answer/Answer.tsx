import React, { useEffect, useState } from 'react'
import styles from './answer.module.css'

interface AnswerProps {
  text: string
}

export const Answer: React.FC<AnswerProps> = ({ text }) => {
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    const placeholder = '<NEWLINE>'
    const words = text.replace(/\n/g, ` ${placeholder} `).split(/\s+/)
    setWords(words)
  }, [text])

  return (
    <div id="AnswerContainer">
      {words.map((word, index) => (
        <span key={index} className={styles.fadeIn} style={{ animationDelay: `${index * 0.01}s` }}>
          {word === '<NEWLINE>' ? (
            <>
              <br />
            </>
          ) : (
            `${word} `
          )}
        </span>
      ))}
    </div>
  )
}

export default Answer

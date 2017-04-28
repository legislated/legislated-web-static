// @flow
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import FontAwesome from 'react-fontawesome'
import { borders } from 'shared/styles'

export class Question extends Component {
  props: {
    title: string,
    children?: any
  }

  // lifecycle
  render () {
    const { title, children } = this.props
    return <div className={css(styles.question)}>
      <h3 className={css(styles.title)}>
        <FontAwesome className={css(styles.icon)} name='question-circle' />
        {title}
      </h3>
      {children}
    </div>
  }
}

const styles = StyleSheet.create({
  question: {
    ...borders.low(['top']),
    marginTop: 15,
    paddingTop: 15
  },
  icon: {
    marginRight: 5
  },
  title: {
    marginBottom: 10
  }
})

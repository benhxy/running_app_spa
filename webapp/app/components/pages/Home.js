import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  getRenderParams() {
    let params = {
      uploadLink: this.props.params.lang == 'tc' ? '/tc/upload' : '/upload'
    }

    return params
  },

  render() {
  	let params = this.getRenderParams()
  	return (
  		<div className="content-wrapper home-wrapper">
  			<div className="sc-text">孤君是一家出版社、版权代理和电影制作公司。<br />孤君是未来。<br />若您是一位小说作家，请将您的稿件寄给我们。<br />孤君利用概率，而不依靠猜测。<br />我们会读您所投的稿件，将与您讨论我们的想法和建议，并给您答复。</div>
  			<div className="tc-text">孤君是一家出版社、版權代理和電影製作公司。<br />孤君是未來。<br />若您是一位小說作家，請將您的稿件寄給我們。<br />孤君利用概率，而不依靠猜測。<br />我們會讀您所投的稿件, 將與您討論我們的想法和建議，並給您答覆。</div>
  			<Link className="home-click-btn" to={params.uploadLink}>投稿</Link>
  		</div>
  	)
  }
})
import React, { Component } from 'react';
import './index.less';
import {Button, Upload, Icon, message} from 'antd';

class Picture extends Component {
	constructor() {
		super();
		// this.handleUpload = this.handleUpload.bind(this);
		this.hangleOnClick = this.hangleOnClick.bind(this);
		this.popupClick = this.popupClick.bind(this);
		this.state = {
			projectImage : '',
			pictureList: [],
			display : 'none',
			picsrc : ''
		}
	}

	// showPic() {
	// 	let imgArr = [];

	// }
	// showup() {
	// 	fetch("http://localhost:3000//showup").then(res => res.json()).then(json => {
	// 		this.setState({pictureList: json.pictureList});
	// 	})
	// }
	hangleOnClick(e) {
		console.log(e.target.src);
		let picsrc = e.target.src;
		this.setState({picsrc:picsrc,display:"block"});

	}

	popupClick() {
		this.setState({picsrc:"",display:"none"});
	}
	render() {
		const props = {
			action: '/upload',
			onChange({ file, fileList }) {
			  if (file.status !== 'uploading') {
				console.log(file, fileList);
			  }
	
			  if (file.status === 'done') {
				message.success(`${file.name} file uploaded successfully`);
				// this.showup();
			  } else if (file.status === 'error') {
				message.error(`${file.name} file upload failed.`);
			  }
			},
			defaultFileList: [],
		  };

		return (
		<div>
			<div className="container" onClick={this.hangleOnClick}>
				<div><img src="http://pao1opmq0.bkt.clouddn.com/sc2tt.jpg" alt=""/></div>
				<div><img src="http://pao1opmq0.bkt.clouddn.com/scp.jpg" alt=""/></div>
				<div><img src="http://pao1opmq0.bkt.clouddn.com/sc2pp.jpg" alt=""/></div>
				<div><img src="http://pao1opmq0.bkt.clouddn.com/sc2z.jpg" alt=""/></div>
				<div><img src="http://pao1opmq0.bkt.clouddn.com/sc2t.jpg" alt=""/></div>
			</div>
			<div className="popup" style={{display: `${this.state.display}`}} onClick={this.popupClick} >
    		<div className="bg"><img src={this.state.picsrc} alt=""/></div>
  		</div>

			<div className="upload">
				<Upload {...props}>
					<Button>
						<Icon type="upload" /> Click to Upload
					</Button>
				</Upload>
			</div>
		</div>
	
		);
	}
}

export default Picture;
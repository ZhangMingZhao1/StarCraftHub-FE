import React, { Component } from 'react';
import './index.less';
import {Button, Upload, Icon, message} from 'antd';

class Picture extends Component {
	constructor() {
		super();
		// this.handleUpload = this.handleUpload.bind(this);
		this.state = {
			projectImage : '',
		}
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
			  } else if (file.status === 'error') {
				message.error(`${file.name} file upload failed.`);
			  }
			},
			defaultFileList: [],
		  };

		return (
		<div>
			<div className="imgBox">
				<div><img src="http://pao1opmq0.bkt.clouddn.com/sc2tt.jpg" alt=""/></div>
				<div><img src="http://pao1opmq0.bkt.clouddn.com/scp.jpg" alt=""/></div>
				<div><img src="http://pao1opmq0.bkt.clouddn.com/sc2pp.jpg" alt=""/></div>
				<div><img src="http://pao1opmq0.bkt.clouddn.com/sc2z.jpg" alt=""/></div>
				<div><img src="http://pao1opmq0.bkt.clouddn.com/sc2t.jpg" alt=""/></div>
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
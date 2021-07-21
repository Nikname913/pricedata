/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ReduxHooksContext } from "../../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import bodyTags from '../../templates/body-styled-elements';

const Editor = bodyTags.TextEditor;
const Header = bodyTags.TextEditorHeader;
const Title = bodyTags.TextEditorHeaderTitle;
const Workspace = bodyTags.TextEditorWorkSpace;
const SideMenu = bodyTags.TextEditorWorkSpaceMenu;
const CodeHere = bodyTags.TextEditorWorkSpaceEditor;

export default function ProductsEditor() {

	const { state } = useContext(ReduxHooksContext);

	return (
		<Editor>
			<Header>
				<Title>
					<span style={{ color: '#ffc000'}}>P</span>RODUCTS VIEWER</Title>
				<FontAwesomeIcon 
					style={{
						display: 'block',
						position: 'relative',
						color: 'white',
						cursor: 'pointer'
					}}
        	size="md" 
        	icon={faTimes}
      	/>
			</Header>
			<Workspace>
				<SideMenu></SideMenu>
				<CodeHere>
					<section 
						contenteditable="true" 
						style={{
							display: "block",
							position: "relative",
							width: "110%",
							height: "100%",
							outline: "none",
							border: "none",
							boxSizing: "border-box",
							color: "white",
							overflowY: "scroll",
							fontSize: "13px",
							padding: "20px",
							paddingLeft: "24px"
						}}
					>
						{ state[10].label[8].label[1].label }
					</section>
				</CodeHere>
			</Workspace>
		</Editor>
	);
}
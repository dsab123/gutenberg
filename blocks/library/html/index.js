/**
 * External dependencies
 */
import TextareaAutosize from 'react-autosize-textarea';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';
import { registerBlockType, source } from '../../api';
import BlockControls from '../../block-controls';

const { html } = source;

registerBlockType( 'core/html', {
	title: __( 'Custom HTML' ),

	icon: 'html',

	category: 'formatting',

	className: false,

	attributes: {
		content: {
			type: 'string',
			source: html(),
		},
	},

	edit: class extends Component {
		constructor() {
			super( ...arguments );
			this.preview = this.preview.bind( this );
			this.edit = this.edit.bind( this );
			this.state = {
				preview: false,
			};
		}

		preview() {
			this.setState( { preview: true } );
		}

		edit() {
			this.setState( { preview: false } );
		}

		render() {
			const { preview } = this.state;
			const { attributes, setAttributes, focus } = this.props;

			return (
				<div>
					{ focus &&
						<BlockControls key="controls">
							<ul className="components-toolbar">
								<li>
									<button className={ `components-tab-button ${ ! preview ? 'is-active' : '' }` } onClick={ this.edit }>
										<span>HTML</span>
									</button>
								</li>
								<li>
									<button className={ `components-tab-button ${ preview ? 'is-active' : '' }` } onClick={ this.preview }>
										<span>{ __( 'Preview' ) }</span>
									</button>
								</li>
							</ul>
						</BlockControls>
					}
					{ preview
						? <div dangerouslySetInnerHTML={ { __html: attributes.content } } />
						: <TextareaAutosize
							value={ attributes.content }
							onChange={ ( event ) => setAttributes( { content: event.target.value } ) }
						/>
					}
				</div>
			);
		}
	},

	save( { attributes } ) {
		return attributes.content;
	},
} );

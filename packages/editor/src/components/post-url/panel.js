/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';
import {
	__experimentalHStack as HStack,
	Dropdown,
	Button,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PostURLCheck from './check';
import PostURL from './index';
import { usePostURLLabel } from './label';

export default function PostURLPanel() {
	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );
	// Memoize popoverProps to avoid returning a new object every time.
	const popoverProps = useMemo(
		() => ( { anchor: popoverAnchor, placement: 'bottom-end' } ),
		[ popoverAnchor ]
	);

	return (
		<PostURLCheck>
			<HStack className="editor-post-url__panel" ref={ setPopoverAnchor }>
				<span>{ __( 'URL' ) }</span>
				<Dropdown
					popoverProps={ popoverProps }
					className="editor-post-url__panel-dropdown"
					contentClassName="editor-post-url__panel-dialog"
					focusOnMount
					renderToggle={ ( { isOpen, onToggle } ) => (
						<PostURLToggle isOpen={ isOpen } onClick={ onToggle } />
					) }
					renderContent={ ( { onClose } ) => (
						<PostURL onClose={ onClose } />
					) }
				/>
			</HStack>
		</PostURLCheck>
	);
}

function PostURLToggle( { isOpen, onClick } ) {
	const label = usePostURLLabel();
	return (
		<Button
			className="editor-post-url__panel-toggle"
			variant="tertiary"
			aria-expanded={ isOpen }
			// translators: %s: Current post URL.
			aria-label={ sprintf( __( 'Change URL: %s' ), label ) }
			onClick={ onClick }
		>
			{ label }
		</Button>
	);
}

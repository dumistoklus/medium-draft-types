import * as React from 'react';
import * as Immutable from 'immutable';

declare module 'medium-draft' {

    export interface PluginEditorProps extends Draft.EditorProps {
        plugins?: DraftPlugin[];
        getParentMethods?: () => {
            getInput: (title: string) => Promise<string>,
        };
    }

    export interface PluginFunctions {
        /**
         * Get the list of plugins passed to the editor
         */
        getPlugins: () => DraftPlugin[];
        /**
         * Get all the props passed to the editor
         */
        getProps: () => PluginEditorProps;
        /**
         * Update the editorState
         */
        setEditorState: (editorState: Draft.EditorState) => void;
        /**
         * Get the latest editorState
         */
        getEditorState: () => Draft.EditorState;
        /**
         * Get if the editor is readOnly or not
         */
        getReadOnly: () => boolean;
        /**
         * Make the editor non-editable
         */
        setReadOnly: (readOnly: boolean) => void;

        getEditorRef?: () => Draft.Editor;
    }

    export interface SimpleDecorator {
        strategy: (block: Draft.ContentBlock, callback: (start: number, end: number) => void, contentState: Draft.ContentState) => void;
        component: () => void;
        props?: {};
    }

    export type DraftDecoratorType = SimpleDecorator | Draft.CompositeDecorator;

    export interface DraftPlugin {
        blockRendererFn?: (cb: Draft.ContentBlock, draftPluginFns: PluginFunctions) => {
            component: React.ComponentType | React.FunctionComponent;
            editable?: boolean;
            props?: {},
        } | null;
        keyBindingFn?: (ev: React.KeyboardEvent<{}>, draftPluginFns: PluginFunctions) => string | void;
        blockStyleFn?: (contentBlock: Draft.ContentBlock) => string;
        blockRenderMap?: Immutable.Map<string, {
            element: string;
            wrapper?: React.ReactElement<any>;
            aliasedElements?: string[];
        }>;
        customStyleMap?: {};
        handleReturn?: (ev: React.KeyboardEvent<{}>, es: Draft.EditorState, draftPluginFns: PluginFunctions) => Draft.DraftHandleValue;
        handleKeyCommand?: (command: string, es: Draft.EditorState, draftPluginFns: PluginFunctions) => Draft.DraftHandleValue;
        handleBeforeInput?: (input: string, es: Draft.EditorState, draftPluginFns: PluginFunctions) => Draft.DraftHandleValue;
        handlePastedText?: (text: string, html: string, editorState: Draft.EditorState, draftPluginFns: PluginFunctions) => Draft.DraftHandleValue;
        handlePastedFiles?: (files: Blob[]) => Draft.DraftHandleValue;
        handleDroppedFiles?: (selection: Draft.SelectionState, files: Blob[], draftPluginFns: PluginFunctions) => Draft.DraftHandleValue;
        handleDrop?: (selection: Draft.EditorState, dataTransfer: DataTransfer, isInternal: Draft.DraftDragType, draftPluginFns: PluginFunctions) => Draft.DraftHandleValue;
        onEscape?: (ev: React.KeyboardEvent<{}>, draftPluginFns: PluginFunctions) => void;
        onTab?: (ev: React.KeyboardEvent<{}>, draftPluginFns: PluginFunctions) => void;
        onUpArrow?: (ev: React.KeyboardEvent<{}>, draftPluginFns: PluginFunctions) => void;
        onChange?: (es: Draft.EditorState, draftPluginFns: PluginFunctions) => Draft.EditorState;
        onRightArrow?: (ev: React.KeyboardEvent<{}>, draftPluginFns: PluginFunctions) => void;
        onDownArrow?: (ev: React.KeyboardEvent<{}>, draftPluginFns: PluginFunctions) => void;
        onLeftArrow?: (ev: React.KeyboardEvent<{}>, draftPluginFns: PluginFunctions) => void;
        onFocus?: (e: React.SyntheticEvent<{}>) => void;
        onBlur?: (e: React.SyntheticEvent<{}>) => void;
        decorators?: DraftDecoratorType[];
        willUnmount?: (draftPluginFns: PluginFunctions) => void;
        initialize?: (draftPluginFns: PluginFunctions) => void;
    }

    export interface Editor {
        placeholder: string;
        plugins: DraftPlugin[];
        editorState: Draft.EditorState;
        onChange: (editorState: Draft.EditorState) => void;
    }

    export function createEditorState(content: string | Draft.RawDraftContentState | null): Draft.EditorState;
}

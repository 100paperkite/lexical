/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import * as React from 'react';
import PlainTextPlugin from './plugins/PlainTextPlugin';
import RichTextPlugin from './plugins/RichTextPlugin';
import RichTextCollabPlugin from './plugins/RichTextCollabPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import CharacterLimitPlugin from 'lexical-react/LexicalCharacterLimitPlugin';
import AutocompletePlugin from './plugins/AutocompletePlugin';
import HashtagsPlugin from 'lexical-react/LexicalHashtagsPlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';
import ActionsPlugin from './plugins/ActionsPlugin';
import AutoFormatterPlugin from 'lexical-react/LexicalAutoFormatterPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import TablesPlugin from './plugins/TablesPlugin';
import TableCellActionMenuPlugin from './plugins/TableCellActionMenuPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import LinksPlugin from './plugins/LinksPlugin';
import StickyPlugin from './plugins/StickyPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';

type Props = {
  isCollab: boolean,
  isCharLimit: boolean,
  isCharLimitUtf8: boolean,
  isAutocomplete: boolean,
  isRichText: boolean,
  showTreeView: boolean,
};

export default function Editor({
  isCollab,
  isAutocomplete,
  isCharLimit,
  isCharLimitUtf8,
  isRichText,
  showTreeView,
}: Props): React$Node {
  return (
    <>
      {isRichText && <ToolbarPlugin />}
      <div
        className={`editor-container ${showTreeView ? 'tree-view' : ''} ${
          !isRichText ? 'plain-text' : ''
        }`}>
        <StickyPlugin />
        <MentionsPlugin />
        <TablesPlugin />
        <TableCellActionMenuPlugin />
        <ImagesPlugin />
        <LinksPlugin />
        <EmojisPlugin />
        <HashtagsPlugin />
        <KeywordsPlugin />
        {isRichText ? (
          <>
            {isCollab ? <RichTextCollabPlugin id="main" /> : <RichTextPlugin />}
            <AutoFormatterPlugin />
            <CodeHighlightPlugin />
          </>
        ) : (
          <PlainTextPlugin />
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin charset={isCharLimit ? 'UTF-16' : 'UTF-8'} />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <ActionsPlugin isRichText={isRichText} />
      </div>
      {showTreeView && <TreeViewPlugin />}
    </>
  );
}
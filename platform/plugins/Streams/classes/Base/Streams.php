<?php

/**
 * Autogenerated base class for the Streams model.
 * 
 * Don't change this file, since it can be overwritten.
 * Instead, change the Streams.php file.
 *
 * @module Streams
 */
/**
 * Base class for the Streams model
 * @class Base_Streams
 */
abstract class Base_Streams
{
	/**
	 * The list of model classes
	 * @property $table_classnames
	 * @type array
	 */
	static $table_classnames = array (
  0 => 'Streams_Access',
  1 => 'Streams_Avatar',
  2 => 'Streams_Invite',
  3 => 'Streams_Invited',
  4 => 'Streams_Message',
  5 => 'Streams_Notification',
  6 => 'Streams_Participant',
  7 => 'Streams_Participating',
  8 => 'Streams_RelatedFrom',
  9 => 'Streams_RelatedTo',
  10 => 'Streams_Request',
  11 => 'Streams_Rule',
  12 => 'Streams_Sent',
  13 => 'Streams_Stream',
  14 => 'Streams_Subscription',
  15 => 'Streams_Total',
);

	/**
     * This method calls Db.connect() using information stored in the configuration.
     * If this has already been called, then the same db object is returned.
	 * @method db
	 * @return {iDb} The database object
	 */
	static function db()
	{
		return Db::connect('Streams');
	}

	/**
	 * The connection name for the class
	 * @method connectionName
	 * @return {string} The name of the connection
	 */
	static function connectionName()
	{
		return 'Streams';
	}
};